import { SignIn } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sign-in")({
  component: () => (
    <div className="flex w-full h-full justify-center items-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  ),
});
