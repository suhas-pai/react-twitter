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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input autoComplete="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Login with your email address.
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
                      <Input
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
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
            <Button variant="outline" className="w-full" onClick={() => {}}>
              <DiscordLogoIcon className="mr-2 h-4 w-4" />
              <span>Discord</span>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => {}}>
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
