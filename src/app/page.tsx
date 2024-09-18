import { api, HydrateClient } from "~/trpc/server";

import CreatePost from "./_components/create-post";
import PostList from "./_components/post-list";

export default async function Home() {
  void api.post.getList.prefetch();

  return (
    <HydrateClient>
      <main>
        <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b text-white">
          <nav className="sticky top-0 z-50 w-full bg-slate-700 p-4 font-semibold text-gray-200">
            <div className="text-x1 flex w-full items-center justify-between font-semibold">
              Top Nav
            </div>
          </nav>
          <div className="container mt-8 flex flex-col items-center gap-4 px-4 py-4">
            <PostList />
          </div>
          <CreatePost />
        </div>
      </main>
    </HydrateClient>
  );
}
