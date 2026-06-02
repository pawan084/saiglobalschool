type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "check"
  | "plus"
  | "minus"
  | "close"
  | "phone"
  | "whatsapp"
  | "mail"
  | "map-pin"
  | "calendar"
  | "clock"
  | "shield"
  | "sparkle"
  | "users"
  | "book-open"
  | "graduation"
  | "flask"
  | "calculator"
  | "monitor"
  | "music"
  | "palette"
  | "globe"
  | "heart"
  | "leaf"
  | "scale"
  | "compass"
  | "lightbulb"
  | "play"
  | "chat"
  | "menu"
  | "facebook"
  | "youtube"
  | "instagram"
  | "linkedin"
  | "sun-rise"
  | "trophy"
  | "puzzle"
  | "target"
  | "eye"
  | "list-check"
  | "school"
  | "document"
  | "credit-card"
  | "rotate"
  | "lock"
  | "trending-up"
  | "user-check"
  | "handshake"
  | "ribbon"
  | "microphone";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 18l-6-6 6-6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M6 18L18 6" />,
  phone: <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  whatsapp: (
    <path d="M3 21l1.7-5.1a8.5 8.5 0 1 1 3.4 3.3L3 21z M8 10c.4 1.5 1.5 2.7 3 3M14.5 13c.6.3 1.3.5 2 .5a.8.8 0 0 0 .8-.7c0-.5-.4-.8-.8-.9l-1.2-.3c-.4-.1-.7 0-.9.2l-.2.2" />
  ),
  mail: <path d="M4 6h16v12H4zM4 6l8 7 8-7" />,
  "map-pin": <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  calendar: <path d="M5 6h14v14H5zM5 10h14M9 4v4M15 4v4" />,
  clock: <path d="M12 7v5l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" />,
  shield: <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />,
  sparkle: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />,
  users: <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11" />,
  "book-open": <path d="M3 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H3zM21 5h-7a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h7z" />,
  graduation: <path d="M3 9l9-4 9 4-9 4-9-4z M21 9v6 M7 11v4a5 5 0 0 0 10 0v-4" />,
  flask: <path d="M9 3h6M10 3v6L4 20h16L14 9V3" />,
  calculator: <path d="M5 3h14v18H5zM5 9h14M9 13h.01M13 13h.01M9 17h.01M13 17h.01M17 13v4" />,
  monitor: <path d="M3 4h18v12H3zM8 21h8M12 17v4" />,
  music: <path d="M9 17V5l12-2v12M9 17a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M21 15a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />,
  palette: <path d="M12 3a9 9 0 0 0 0 18c1 0 1.5-.4 1.5-1 0-.6-.5-1-1-1.5s-1-1-1-1.5c0-1 1-1 2-1h2A4 4 0 0 0 19 11a7 7 0 0 0-7-8z M7.5 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M10 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M16 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
  globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z" />,
  heart: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />,
  leaf: <path d="M3 21c0-10 8-18 18-18 0 10-8 18-18 18z M3 21l8-8" />,
  scale: <path d="M12 3v18M5 21h14M5 8l-2 7h6l-2-7zM19 8l-2 7h6l-2-7z" />,
  compass: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15 9l-2 5-5 2 2-5z" />,
  lightbulb: <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.5 11l1 1V17h5v-3l1-1A6 6 0 0 0 12 2z" />,
  play: <path d="M6 4l14 8L6 20z" />,
  chat: <path d="M21 12a8 8 0 0 1-8 8H6l-3 3v-9a8 8 0 0 1 8-8h2a8 8 0 0 1 8 6z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  facebook: <path d="M14 22v-8h3l1-4h-4V8a2 2 0 0 1 2-2h2V2.5A14 14 0 0 0 15.5 2C12 2 10 4 10 7v3H7v4h3v8z" />,
  youtube: <path d="M22 8a3 3 0 0 0-2-2c-2-.5-8-.5-8-.5s-6 0-8 .5a3 3 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 0 4 3 3 0 0 0 2 2c2 .5 8 .5 8 .5s6 0 8-.5a3 3 0 0 0 2-2 30 30 0 0 0 0-4 30 30 0 0 0 0-4z M10 8.5l5 3.5-5 3.5z" />,
  instagram: <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M17.5 6.5h.01" />,
  linkedin: <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 17V10 M8 7h.01 M16 17v-4a2 2 0 0 0-4 0v4 M12 13v4" />,
  "sun-rise": <path d="M12 2v4M5 7l3 3M19 7l-3 3M3 18h18M8 18a4 4 0 1 1 8 0" />,
  trophy: <path d="M8 21h8M12 17v4M5 4h14v6a7 7 0 1 1-14 0z M5 7H2v3a3 3 0 0 0 3 3 M19 7h3v3a3 3 0 0 1-3 3" />,
  puzzle: <path d="M3 7h3a2 2 0 1 1 4 0h4a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 1-4 0h-4a2 2 0 1 1-4 0H3v-3a2 2 0 1 0 0-4z" />,
  target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
  eye: <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  "list-check": <path d="M3 6h2l1 1 3-3M3 12h2l1 1 3-3M3 18h2l1 1 3-3M13 7h8M13 13h8M13 19h8" />,
  school: <path d="M3 21h18M5 21V10l7-5 7 5v11 M9 21v-6h6v6" />,
  document: <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6 M8 13h8M8 17h6" />,
  "credit-card": <path d="M2 6h20v12H2zM2 10h20" />,
  rotate: <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />,
  lock: <path d="M5 11h14v10H5zM8 11V7a4 4 0 1 1 8 0v4" />,
  "trending-up": <path d="M3 17l6-6 4 4 8-8 M14 7h7v7" />,
  "user-check": <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M17 11l2 2 4-4" />,
  handshake: <path d="M11 17l-3-3-2 2-3-3 7-7 3 3M14 14l3 3 2-2 3 3-7 7-3-3" />,
  ribbon: <path d="M9 21l3-2 3 2-1-6h-4z M7 3h10a3 3 0 0 1 3 3v6a8 8 0 0 1-16 0V6a3 3 0 0 1 3-3z" />,
  microphone: <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />,
};

export default function Icon({
  name,
  size = 18,
  className = "",
  strokeWidth = 1.75,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
