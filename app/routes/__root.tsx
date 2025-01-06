import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Sidebar } from "~/components/sidebar";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const Route = createRootRouteWithContext<{}>()({
  component: () => (
    <>
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[240px_1fr] min-h-screen">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  ),
});
