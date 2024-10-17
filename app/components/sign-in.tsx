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

import { useMemo, useState } from "react";
import { AtSign, Eye, EyeOff } from "lucide-react";

import { betterAuthClient } from "~/client/auth/betterauth";

async function handleSubmit(values: z.infer<typeof formSchema>) {
  const { email, password } = values;
  await betterAuthClient.signIn.email({
    email,
    password,
    fetchOptions: {
      onSuccess(ctx: any) {
        console.log(ctx);
      },
    },
  });
}

const formSchema = z.object({
  email: z.string().email({ message: "Email address is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be less than 50 characters" }),
});

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.watch("email");
  const emailIsValid = useMemo(
    () => z.string().email().safeParse(email).success,
    [email]
  );

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
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
                          ? "text-destructive font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {email === "" || emailIsValid
                        ? "Your email address is required to sign in."
                        : "Please enter a valid email address."}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          autoComplete="current-password"
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
                    <FormDescription>Provide your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Log In
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
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
