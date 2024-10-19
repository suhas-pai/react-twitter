import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import NavBar from "@/components/navbar";

export const Route = createRootRouteWithContext<{}>()({
  component: () => (
    <>
      <NavBar />
      <div className="rest-of-page">
        <Outlet />
      </div>
    </>
  ),
  scripts: () =>
    import.meta.env.DEV
      ? [
          {
            type: "module",
            children: `import RefreshRuntime from "/_build/@react-refresh";
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type`,
          },
        ]
      : [],
});
