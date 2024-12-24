import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import NavBar from "@/components/navbar";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const Route = createRootRouteWithContext<{}>()({
  component: () => (
    <>
      <NavBar />
      <div className="rest-of-page">
        <Outlet />
      </div>
    </>
  ),
});
