import { z } from "zod";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";

import { AtSign, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authSchema } from "@/lib/auth/schema";
import { Label } from "./ui/label";
import { cn } from "~/lib/utils";
import { signUp } from "~/client/auth/betterauth";
import { PasswordInput } from "./password-input";
import { EmailInput } from "./email-input";

const formSchema = z.object({
  displayName: z
    .string()
    .min(authSchema.displayNameMinLength, {
      message: `Display name must be at least ${authSchema.displayNameMinLength} characters`,
    })
    .max(authSchema.displayNameMaxLength, {
      message: `Display name must be at most ${authSchema.displayNameMaxLength} characters`,
    }),
  username: z
    .string()
    .min(authSchema.usernameMinLength, {
      message: `Username must be at least ${authSchema.usernameMinLength} characters`,
    })
    .max(authSchema.usernameMaxLength, {
      message: `Username must be less than ${authSchema.usernameMaxLength} characters`,
    }),
  password: z
    .string()
    .min(authSchema.passwordMinLength, {
      message: `Password must be at least ${authSchema.passwordMinLength} characters`,
    })
    .max(authSchema.passwordMaxLength, {
      message: `Password must be less than ${authSchema.passwordMinLength} characters`,
    }),
  retypedPassword: z.string(),
  email: z.string().email({ message: "Email address is invalid" }),
  iconImage: z.string().nonempty(),
});

const OrContinueWith = () => {
  return (
    <>
      <p className="text-center text-sm text-muted-foreground">
        or continue with
      </p>
      <div className="flex w-full justify-center space-x-4">
        <Button variant="outline" className="w-full cursor-pointer">
          <DiscordLogoIcon className="mr-2 h-4 w-4" />
          <span>Discord</span>
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </Button>
      </div>
    </>
  );
};

const getStrengthColor = (score: number) => {
  if (score === 0) return "bg-border";
  if (score <= 1) return "bg-red-500";
  if (score <= 2) return "bg-orange-500";
  if (score === 3) return "bg-amber-500";

  return "bg-emerald-500";
};

const getStrengthText = (score: number) => {
  if (score === 0) return "Enter a password";
  if (score <= 2) return "Weak password";
  if (score === 3) return "Medium password";

  return "Strong password";
};

const checkStrength = (pass: string) => {
  const requirements = [
    {
      regex: /.{6,}/,
      text: `At least ${authSchema.passwordMinLength} characters`,
    },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }));
};

function PasswordSecurityInfo({
  strengthScore,
  strength,
}: {
  strengthScore: number;
  strength: ReturnType<typeof checkStrength>;
}) {
  return (
    <>
      {/* Password strength indicator */}
      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
        tabIndex={0}
      >
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out",
            getStrengthColor(strengthScore)
          )}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        />
      </div>
      {/* Password strength description */}
      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>
      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req) => (
          <li key={req.text} className="flex items-center space-x-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "text-xs",
                req.met ? "text-emerald-600" : "text-muted-foreground"
              )}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    validators: { onChange: formSchema },
    defaultValues: {
      displayName: "",
      username: "",
      password: "",
      retypedPassword: "",
      email: "",
      iconImage: "",
    },
    onSubmit: async ({
      value: { displayName, username, email, password, iconImage },
    }) => {
      console.log("Signing up...");
      const result = await signUp.email({
        name: displayName,
        email,
        password,
        username,
        image: iconImage,
      });

      console.log(result);
    },
  });

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[700px] bg-primary-foreground">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Enter your details below to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-row justify-between gap-5">
              <form.Field
                name="displayName"
                // biome-ignore lint/correctness/noChildrenProp: <explanation>
                children={(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <div className="w-full">
                      <Label>
                        Display Name
                        <span className="text-destructive"> *</span>
                      </Label>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <p
                        className={cn(
                          "text-[0.8rem] text-muted-foreground",
                          hasError
                            ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30 font-medium"
                            : ""
                        )}
                      >
                        {hasError
                          ? field.state.meta.errors[0]
                          : "This is the name shown on your profile."}
                      </p>
                    </div>
                  );
                }}
              />
              <form.Field
                name="username"
                // biome-ignore lint/correctness/noChildrenProp: <explanation>
                children={(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <div className="w-full">
                      <Label>
                        Username/Handle{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          className="pl-9"
                          autoComplete="username"
                          required
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <AtSign
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                            role="presentation"
                          />
                        </div>
                      </div>
                      <p
                        className={cn(
                          "text-[0.8rem] text-muted-foreground",
                          hasError
                            ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30 font-medium"
                            : ""
                        )}
                      >
                        {hasError
                          ? field.state.meta.errors[0]
                          : "Your username will serve as your social media handle."}
                      </p>
                    </div>
                  );
                }}
              />
            </div>
            <form.Field
              name="email"
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <EmailInput
                    className={cn(
                      "peer pl-9",
                      hasError
                        ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                        : ""
                    )}
                    label={
                      <>
                        Email <span className="text-destructive">*</span>
                      </>
                    }
                    autoComplete="email"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  >
                    <p
                      className={cn(
                        "text-[0.8rem] text-muted-foreground",
                        hasError
                          ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30 font-medium"
                          : ""
                      )}
                    >
                      {hasError
                        ? "Please enter a valid email address"
                        : "Your email is required to verify your account."}
                    </p>
                  </EmailInput>
                );
              }}
            />
            <form.Field
              name="password"
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={(field) => {
                const strength = checkStrength(field.state.value);
                const strengthScore = strength.filter((req) => req.met).length;

                return (
                  <>
                    <PasswordInput
                      className={
                        field.state.meta.isTouched && strengthScore < 4
                          ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                          : ""
                      }
                      label={
                        <>
                          Password <span className="text-destructive">*</span>
                        </>
                      }
                      name={field.name}
                      value={field.state.value}
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                      Your password is required to be secure.
                    </p>
                    <PasswordSecurityInfo
                      strengthScore={strengthScore}
                      strength={strength}
                    />
                  </>
                );
              }}
            />
            <form.Field
              name="retypedPassword"
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={(field) => {
                const password = form.getFieldValue("password");
                const hasError =
                  password !== field.state.value &&
                  password !== "" &&
                  field.state.value !== "";

                return (
                  <>
                    <PasswordInput
                      className={
                        hasError
                          ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                          : ""
                      }
                      label={
                        <>
                          Retype Password
                          <span className="text-destructive"> *</span>
                        </>
                      }
                      name={field.name}
                      value={field.state.value}
                      placeholder="Retype Password"
                      autoComplete="new-password"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <p
                      className={cn(
                        "text-[0.8rem]",
                        hasError
                          ? "mt-2 text-xs text-destructive font-medium"
                          : "text-muted-foreground"
                      )}
                      aria-live="polite"
                    >
                      {hasError
                        ? "Passwords do not match"
                        : "Re-enter your password."}
                    </p>
                  </>
                );
              }}
            />
            <form.Field
              name="iconImage"
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={(field) => (
                <div className="flex items-center gap-2 w-full">
                  {field.state.value && (
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                      <img src={field.state.value} alt="Profile preview" />
                    </div>
                  )}
                  <Input
                    className="w-full items-center"
                    required
                    type="file"
                    name={field.name}
                    value={field.state.value}
                    accept="image/*"
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </div>
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="mt-5 w-full cursor-pointer"
                  disabled={!canSubmit || form.state.isPristine}
                >
                  {isSubmitting ? "..." : "Sign Up"}
                </Button>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <hr className="w-full" />
          <Button variant="link">
            <Link to="/login">Already have an account? Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
