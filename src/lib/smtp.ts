import net from "node:net";
import tls from "node:tls";

type MailInput = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

type SmtpSocket = net.Socket | tls.TLSSocket;

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function dotStuff(value: string) {
  return value.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function waitForResponse(socket: SmtpSocket, expected: number | number[]) {
  const expectedCodes = Array.isArray(expected) ? expected : [expected];

  return new Promise<string>((resolve, reject) => {
    let buffer = "";

    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onClose() {
      cleanup();
      reject(new Error("SMTP connection closed unexpectedly"));
    }

    function onData(chunk: Buffer) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const finalLine = lines.findLast((line) => /^\d{3} /.test(line));
      if (!finalLine) return;

      const code = Number(finalLine.slice(0, 3));
      cleanup();
      if (expectedCodes.includes(code)) {
        resolve(buffer);
      } else {
        reject(new Error(`SMTP expected ${expectedCodes.join("/")} but got ${buffer.trim()}`));
      }
    }

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);
  });
}

async function sendCommand(socket: SmtpSocket, command: string, expected: number | number[]) {
  socket.write(`${command}\r\n`);
  return waitForResponse(socket, expected);
}

function createSocket(host: string, port: number) {
  return new Promise<net.Socket>((resolve, reject) => {
    const socket = net.createConnection({ host, port });
    socket.once("connect", () => resolve(socket));
    socket.once("error", reject);
  });
}

function upgradeToTls(socket: net.Socket, host: string) {
  return new Promise<tls.TLSSocket>((resolve, reject) => {
    const secureSocket = tls.connect({ socket, servername: host });
    secureSocket.once("secureConnect", () => resolve(secureSocket));
    secureSocket.once("error", reject);
  });
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !Number.isFinite(port) || !user || !pass) return null;
  return { host, port, user, pass };
}

export async function sendSmtpMail(config: SmtpConfig, input: MailInput) {
  let socket: SmtpSocket = await createSocket(config.host, config.port);

  try {
    await waitForResponse(socket, 220);
    await sendCommand(socket, `EHLO ${config.host}`, 250);
    await sendCommand(socket, "STARTTLS", 220);
    socket = await upgradeToTls(socket as net.Socket, config.host);
    await sendCommand(socket, `EHLO ${config.host}`, 250);

    const auth = Buffer.from(`\0${config.user}\0${config.pass}`).toString("base64");
    await sendCommand(socket, `AUTH PLAIN ${auth}`, 235);

    await sendCommand(socket, `MAIL FROM:<${config.user}>`, 250);
    await sendCommand(socket, `RCPT TO:<${input.to}>`, [250, 251]);
    await sendCommand(socket, "DATA", 354);

    const from = cleanHeader(input.from);
    const to = cleanHeader(input.to);
    const subject = cleanHeader(input.subject);
    const replyTo = input.replyTo ? cleanHeader(input.replyTo) : undefined;
    const headers = [
      `From: ${from}`,
      `To: ${to}`,
      ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
      `Subject: ${subject}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${Date.now()}.${Math.random().toString(36).slice(2)}@sssgs>`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
    ];
    const message = `${headers.join("\r\n")}\r\n\r\n${dotStuff(input.text)}`;

    socket.write(`${message}\r\n.\r\n`);
    await waitForResponse(socket, 250);
    await sendCommand(socket, "QUIT", 221);
  } finally {
    socket.destroy();
  }
}
