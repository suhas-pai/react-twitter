import { useAuth } from "@clerk/clerk-react";

export enum FeedType {
  FOR_YOU = "For You",
  FOLLOWING = "Following",
}

function Tab({
  feedType,
  setFeedType,
  selected,
  isRight,
  disabled,
}: {
  feedType: FeedType;
  setFeedType: (type: FeedType) => void;
  selected: boolean;
  isRight: boolean;
  disabled: boolean;
}) {
  return (
    <div
      className={`relative flex flex-1 cursor-pointer justify-center ${isRight ? "border-r" : "border-l"} p-3 text-sm transition duration-300 bg-primary-foreground hover:bg-secondary ${selected ? "font-semibold" : "text-secondary-foreground"} ${disabled ? "opacity-50" : ""}`}
      onClick={() => !disabled && setFeedType(feedType)}
    >
      {feedType}
      {selected && (
        <div className="absolute bottom-0 h-1 w-10 rounded-full bg-primary"></div>
      )}
    </div>
  );
}

export default function PostFeedTabs({
  selectedFeedType,
  setFeedType,
  disabled,
}: {
  selectedFeedType: FeedType;
  setFeedType: (type: FeedType) => void;
  disabled?: boolean;
}) {
  const auth = useAuth();
  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <div className="flex w-full border-b min-w-96">
        <Tab
          feedType={FeedType.FOR_YOU}
          setFeedType={setFeedType}
          selected={selectedFeedType === FeedType.FOR_YOU}
          isRight={false}
          disabled={disabled ?? false}
        />
        <Tab
          feedType={FeedType.FOLLOWING}
          setFeedType={setFeedType}
          selected={selectedFeedType === FeedType.FOLLOWING}
          isRight={true}
          disabled={disabled ?? auth.isSignedIn === false}
        />
      </div>
    </div>
  );
}
