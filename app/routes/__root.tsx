import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Sidebar } from "~/components/sidebar";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
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
