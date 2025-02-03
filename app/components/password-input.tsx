import React from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "./ui/label";

export function PasswordInput({
  children,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  children?: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const id = React.useId();

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mb-2">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          onPaste={(e) => e.preventDefault()}
          {...rest}
        />
        <button
          className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => setIsVisible((old) => !old)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls={id}
        >
          {isVisible ? (
            <EyeOff
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            <Eye
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          )}
        </button>
      </div>
      {children}
    </div>
  );
}
