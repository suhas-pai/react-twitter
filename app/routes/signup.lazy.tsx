import { createLazyFileRoute } from "@tanstack/react-router";
import SignUp from "~/components/sign-up";

export const Route = createLazyFileRoute("/signup")({
  component: () => (
    <div className="flex w-full h-full justify-center items-center pt-4">
      <SignUp />
    </div>
  ),
});
