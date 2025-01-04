import { createLazyFileRoute } from "@tanstack/react-router";
import Login from "@/components/sign-in";

export const Route = createLazyFileRoute("/login")({
  component: () => (
    <div className="flex w-full h-full justify-center items-center pt-14">
      <Login />
    </div>
  ),
});
