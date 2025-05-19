import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";

import React from "react";
import { Mail } from "lucide-react";
import { z } from "zod/v4";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { signIn } from "~/client/auth/betterauth";
import { authSchema } from "~/lib/auth/schema";
import { cn } from "~/lib/utils";

import { PasswordInput } from "./password-input";
import { EmailInput } from "./email-input";

const formSchema = z.object({
  email: z.email({ error: "Email address is invalid" }),
  password: z
    .string()
    .min(authSchema.passwordMinLength, {
      error: "Password must be at least 6 characters",
    })
    .max(authSchema.passwordMaxLength, {
      error: "Password must be less than 50 characters",
    }),
});

export default function Login() {
  const [rememberMe, setRememberMe] = React.useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;
      await signIn.email({
        email,
        password,
        rememberMe,
        fetchOptions: {
          onSuccess(ctx) {
            console.log(ctx);
          },
          onError(ctx) {
            console.log(`Error: ${ctx}`);
          },
        },
      });
    },
  });

  const sendMagicLink = async () => {
    await signIn.magicLink({ email: form.getFieldValue("email") });
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px] bg-primary-foreground">
        <CardHeader>
          <CardTitle>Sign In to Your Account</CardTitle>
          <CardDescription>
            Enter your details below to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <form.Field name="email">
              {(field) => {
                const hasErrors =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <EmailInput
                    className={cn(
                      "peer",
                      hasErrors
                        ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                        : ""
                    )}
                    placeholder="Email"
                    label="Email"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    required
                  >
                    <p
                      className={cn(
                        "text-[0.8rem] text-muted-foreground",
                        hasErrors
                          ? "text-destructive font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {field.state.meta.errors
                        ? "Your email address is required to sign in."
                        : "Please enter a valid email address."}
                    </p>
                  </EmailInput>
                );
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <>
                  <PasswordInput
                    label={"Password"}
                    autoComplete="current-password"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  >
                    <p className="text-[0.8rem] text-muted-foreground ">
                      Please provide your password.
                    </p>
                  </PasswordInput>
                  <div className="flex justify-center gap-2">
                    <Checkbox
                      id="remember-me"
                      defaultChecked={rememberMe}
                      onCheckedChange={(old) => setRememberMe(!old)}
                    />
                    <Label htmlFor="remember-me">Remember Me</Label>
                  </div>
                </>
              )}
            </form.Field>
            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={!canSubmit || form.state.isPristine}
                >
                  Log In
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <hr className="w-full" />
          <p className="text-center text-sm text-muted-foreground">
            or continue with
          </p>
          <div className="flex w-full justify-center space-x-4">
            <form.Subscribe selector={(state) => state.fieldMeta.email?.errors}>
              {() => (
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  disabled={
                    form.state.fieldMeta.email?.isPristine ||
                    form.state.fieldMeta.email?.errors.length > 0
                  }
                  onClick={sendMagicLink}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Login with Magic Link</span>
                </Button>
              )}
            </form.Subscribe>
          </div>
          <Button variant="link">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
