import { createLazyFileRoute } from "@tanstack/react-router";
import PostFeed from "~/components/post-feed";
import PostFeedTabs, { FeedType } from "~/components/post-feed-tab";

export const Route = createLazyFileRoute("/")({
  component: Index,
  pendingComponent: () => (
    <div className="flex justify-center">
      <PostFeedTabs
        selectedFeedType={FeedType.FOR_YOU}
        setFeedType={() => {}}
        disabled={true}
      />
    </div>
  ),
});

function Index() {
  return (
    <div className="flex justify-center">
      <PostFeed />
    </div>
  );
}
