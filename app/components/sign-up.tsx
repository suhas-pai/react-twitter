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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

import { AtSign, Check, Eye, EyeOff, X } from "lucide-react";
import { useMemo, useState } from "react";

function handleSubmit() {
  // TODO
}

const formSchema = z.object({
  displayName: z.string().max(50, { message: "Display name is too long" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Username must be less than 50 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be less than 50 characters" }),
  retypedPassword: z.string(),
  email: z.string().email({ message: "Email address is invalid" }),
});

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
      text: `At least ${formSchema.shape.password.minLength} characters`,
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
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
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
        {strength.map((req, index) => (
          <li key={index} className="flex items-center space-x-2">
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
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypedPasswordVisible, setIsRetypedPasswordVisible] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      username: "",
      password: "",
      email: "",
    },
  });

  const [email, password, retypedPassword] = form.watch([
    "email",
    "password",
    "retypedPassword",
  ]);

  const strength = checkStrength(password);
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength]
  );

  const emailIsValid = useMemo(
    () => z.string().email().safeParse(email).success,
    [email]
  );

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[400px] bg-primary-foreground">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Enter your details below to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-3">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Display Name
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name shown on your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input autoComplete="username" {...field} required />
                    </FormControl>
                    <FormDescription>
                      Your username will serve as your social media handle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">
                      Password
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          className={
                            (password !== retypedPassword ||
                              strengthScore < 4) &&
                            password !== "" &&
                            retypedPassword !== ""
                              ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                              : ""
                          }
                          autoComplete="new-password"
                          placeholder="Password"
                          type={isPasswordVisible ? "text" : "password"}
                          aria-invalid={strengthScore < 4}
                          aria-describedby="password-strength"
                          {...field}
                        />
                        <button
                          className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          type="button"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          aria-label={
                            isPasswordVisible
                              ? "Hide password"
                              : "Show password"
                          }
                          aria-pressed={isPasswordVisible}
                          aria-controls="password"
                        >
                          {isPasswordVisible ? (
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
                    </FormControl>
                    <FormDescription>
                      Your password is required to be secure.
                    </FormDescription>
                    <FormMessage />
                    <PasswordSecurityInfo
                      strengthScore={strengthScore}
                      strength={strength}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retypedPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="retype-password">
                      Retype Password
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          id="retype-password"
                          className={
                            password !== retypedPassword &&
                            password !== "" &&
                            retypedPassword !== ""
                              ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                              : ""
                          }
                          placeholder="Password"
                          type={isRetypedPasswordVisible ? "text" : "password"}
                          autoComplete="repeat-password"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() =>
                          setIsRetypedPasswordVisible(!isRetypedPasswordVisible)
                        }
                        aria-label={
                          isRetypedPasswordVisible
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={isRetypedPasswordVisible}
                        aria-controls="password"
                      >
                        {isRetypedPasswordVisible ? (
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
                    <FormDescription
                      className={
                        password !== retypedPassword &&
                        password !== "" &&
                        retypedPassword !== ""
                          ? "mt-2 text-xs text-destructive font-medium"
                          : ""
                      }
                      aria-live="polite"
                    >
                      {password !== retypedPassword &&
                      password !== "" &&
                      retypedPassword !== ""
                        ? "Passwords do not match"
                        : "Re-enter your password."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormLabel htmlFor="email">
                        Email
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            id="email"
                            className={`peer pl-9 ${email !== "" && !emailIsValid ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30" : ""}`}
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <AtSign
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                            role="presentation"
                          />
                        </div>
                      </div>
                    </div>
                    <FormDescription
                      className={
                        email !== "" && !emailIsValid
                          ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30 font-medium"
                          : ""
                      }
                    >
                      {email !== "" && !emailIsValid
                        ? "Please enter a valid email address"
                        : "Your email is required to verify your account."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <hr className="w-full" />
          <p className="text-center text-sm">or continue with</p>
          <div className="flex w-full justify-center space-x-4">
            <Button variant="outline" className="w-full">
              <DiscordLogoIcon className="mr-2 h-4 w-4" />
              <span>Discord</span>
            </Button>
            <Button variant="outline" className="w-full">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </Button>
          </div>
          <Button variant="link">
            <Link to="/login">Already have an account? Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
