import clsx from "clsx";
import s from "./Button.module.css";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  href,
  className,
}: ButtonProps) {
  const buttonClass = clsx(s.button, s[variant], className);

  // If `href` is provided, render a `Link` instead of a `button`
  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
