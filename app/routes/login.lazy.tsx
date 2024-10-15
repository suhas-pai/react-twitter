import { createLazyFileRoute } from "@tanstack/react-router";
import SignIn from "~/components/sign-in";

export const Route = createLazyFileRoute("/login")({
  component: () => (
    <div className="flex w-full h-full justify-center items-center pt-14">
      <SignIn />
    </div>
  ),
});
