import React from "react";
import { Mail } from "lucide-react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";

export function EmailInput({
  label,
  children,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="email"
          className={cn("pl-10", className)}
          {...rest}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Mail
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            role="presentation"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
