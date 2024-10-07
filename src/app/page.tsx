import { api, HydrateClient } from "~/trpc/server";
import PostList from "./_components/post-list";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b text-white">
          <div className="container flex flex-col items-center gap-4 px-4 py-4">
            <PostList />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
