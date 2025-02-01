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

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Link } from "@tanstack/react-router";

import { AtSign, Mail } from "lucide-react";

import { signIn } from "@/client/auth/betterauth";
import { authSchema } from "@/lib/auth/schema";
import { Label } from "./ui/label";
import { PasswordInput } from "./password-input";
import { cn } from "~/lib/utils";

const formSchema = z.object({
  email: z.string().email({ message: "Email address is invalid" }),
  password: z
    .string()
    .min(authSchema.passwordMinLength, {
      message: "Password must be at least 6 characters",
    })
    .max(authSchema.passwordMaxLength, {
      message: "Password must be less than 50 characters",
    }),
});

export default function Login() {
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
        fetchOptions: {
          onSuccess(ctx) {
            console.log(ctx);
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
            <form.Field
              name="email"
              // biome-ignore lint/correctness/noChildrenProp: <explanation></explanation>
              children={(field) => {
                const hasErrors =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Email</Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          className={cn(
                            "peer pl-9",
                            hasErrors
                              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
                              : ""
                          )}
                          placeholder="Email"
                          type="email"
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
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
                          hasErrors
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {field.state.meta.errors
                          ? "Your email address is required to sign in."
                          : "Please enter a valid email address."}
                      </p>
                    </div>
                  </>
                );
              }}
            />
            <form.Field
              name="password"
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={(field) => (
                <>
                  <Label>Password</Label>
                  <div className="relative">
                    <PasswordInput
                      autoComplete="current-password"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <p className="text-[0.8rem] text-muted-foreground ">
                      Provide your password.
                    </p>
                  </div>
                </>
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit]}
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={([canSubmit]) => (
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={!canSubmit || form.state.isPristine}
                >
                  Log In
                </Button>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <hr className="w-full" />
          <p className="text-center text-sm text-muted-foreground">
            or continue with
          </p>
          <div className="flex w-full justify-center space-x-4">
            <form.Subscribe
              selector={(state) => state.fieldMeta.email?.errors}
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children={() => (
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
            />
          </div>
          <Button variant="link">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
