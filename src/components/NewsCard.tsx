import Image from "next/image";
import Link from "next/link";

export type NewsCardProps = {
  title: string;
  href: string;
  image?: string;
  /** CSS object-position for the image. Use "top" for portrait people photos. */
  imagePosition?: "center" | "top" | "bottom" | "left" | "right";
  lead?: string;
  eyebrow?: string;
  variant: "hero" | "feature" | "compact" | "list";
  priority?: boolean;
};

const POS_CLASS: Record<NonNullable<NewsCardProps["imagePosition"]>, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

export default function NewsCard({
  title,
  href,
  image,
  imagePosition = "center",
  lead,
  eyebrow,
  variant,
  priority,
}: NewsCardProps) {
  const objCls = POS_CLASS[imagePosition];

  if (variant === "hero") {
    return (
      <Link href={href} className="block group">
        <article>
          {image && (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded">
              <Image
                src={image}
                alt={title}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-cover ${objCls} transition-transform duration-500 group-hover:scale-[1.04]`}
              />
            </div>
          )}
          <div className="pt-4">
            {eyebrow && <div className="news-eyebrow mb-2">{eyebrow}</div>}
            <h2 className="news-headline text-2xl sm:text-3xl lg:text-[32px] group-hover:text-[var(--brand-primary)]">
              {title}
            </h2>
            {lead && <p className="news-lead mt-3 line-clamp-3">{lead}</p>}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link href={href} className="flex flex-col group h-full">
        <article className="flex flex-col h-full">
          {image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 rounded">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className={`object-cover ${objCls} transition-transform duration-500 group-hover:scale-[1.04]`}
              />
            </div>
          )}
          <div className="pt-3 flex-1 flex flex-col">
            {eyebrow && <div className="news-eyebrow mb-1">{eyebrow}</div>}
            <h3 className="news-headline text-[16.5px] sm:text-[17.5px] group-hover:text-[var(--brand-primary)] line-clamp-3">
              {title}
            </h3>
            {lead && <p className="news-lead mt-1.5 line-clamp-2">{lead}</p>}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="flex gap-3 group items-start min-h-[68px]">
        {image && (
          <div className="relative shrink-0 w-[90px] h-[68px] overflow-hidden bg-slate-100 rounded">
            <Image
              src={image}
              alt={title}
              fill
              sizes="90px"
              className={`object-cover ${objCls} transition-transform duration-500 group-hover:scale-[1.04]`}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {eyebrow && <div className="news-eyebrow mb-0.5 text-[10px]">{eyebrow}</div>}
          <h4 className="news-headline text-[14px] leading-[1.35] group-hover:text-[var(--brand-primary)] line-clamp-3">
            {title}
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group flex items-start gap-2">
      <span className="text-[var(--brand-accent)] mt-1">▸</span>
      <span className="news-headline text-[14px] font-semibold group-hover:text-[var(--brand-primary)]">
        {title}
      </span>
    </Link>
  );
}
