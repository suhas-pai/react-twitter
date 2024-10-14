import { SignUp } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sign-up")({
  component: () => (
    <div className="flex w-full h-full justify-center items-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  ),
});
