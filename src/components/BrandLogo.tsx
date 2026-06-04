import Image from "next/image";
import logo from "../../public/logo-256.png";

type Props = {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
};

export default function BrandLogo({
  size = 56,
  className = "",
  alt = "Sri Sathya Sai Global School",
  priority = false,
}: Props) {
  return (
    <Image
      src={logo}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={className}
      style={{ display: "block", width: size, height: size }}
    />
  );
}
