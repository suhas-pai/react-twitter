import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const trendingTopics = [
  { topic: "#TechNews", posts: "125K" },
  { topic: "World Cup", posts: "89K" },
  { topic: "Climate Change", posts: "56K" },
  { topic: "#CodingLife", posts: "42K" },
  { topic: "SpaceX", posts: "38K" },
];

const suggestedUsers = [
  { name: "Tech Insider", handle: "techinsider" },
  { name: "Science Daily", handle: "sciencedaily" },
  { name: "Elon Musk", handle: "elonmusk" },
];

export function RightSidebar() {
  return (
    <div className="w-80 p-4 space-y-4 hidden lg:block">
      <div className="sticky top-0 pt-2 pb-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10 bg-gray-100 border-none"
          />
        </div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Trends for you</h2>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="py-3">
            <p className="text-sm text-gray-500">{topic.topic}</p>
            <p className="font-bold">{topic.posts} posts</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        {suggestedUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-gray-500">@{user.handle}</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
