import { Flame, TrendingUp, Clock, Users } from "lucide-react";
import { Community } from "../../../types/communties";

export const communityFilters = ({
  communities = [],
  selectedCategory,
  subscribedCommunityIds,
}: {
  communities: Community[];
  selectedCategory: string | null;
  subscribedCommunityIds: string[];
}) => {
  const filteredCommunities = selectedCategory
    ? communities.filter((c) => c.category === selectedCategory)
    : communities;

  const subscribed = filteredCommunities.map((community) => ({
    ...community,
    isSubscribed: subscribedCommunityIds.includes(community.id),
  }));

  const discover = subscribed.filter((c) => c.isSponsored);

  const trending = subscribed
    .filter((community) => community.planes.some((plan) => plan.price > 0))
    .sort((a, b) => {
      const priceA = a.planes.find((plan) => plan.is_recurring)?.price ?? 0;
      const priceB = b.planes.find((plan) => plan.is_recurring)?.price ?? 0;
      return priceB - priceA;
    })
    .concat(
      subscribed.filter((c) => c.planes.some((plan) => plan.price === 0))
    );

  const members = [...subscribed].sort((a, b) => {
    const membersA = a.members ?? 0;
    const membersB = b.members ?? 0;
    return membersB - membersA;
  });

  const newest = [...subscribed].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  const filterItems = [
    {
      label: "Discover",
      value: "discover",
      icon: Flame,
      bgColor: "bg-purple-500",
    },
    {
      label: "Trending",
      value: "trending",
      icon: TrendingUp,
      bgColor: "bg-green-500",
    },
    { label: "Newest", value: "newest", icon: Clock, bgColor: "bg-yellow-500" },
    {
      label: "Members",
      value: "members",
      icon: Users,
      bgColor: "bg-orange-500",
    },
  ];

  const communityListItems = [
    {
      title: "🔥 Trending Communities",
      value: "trending",
      description: "Communities with the highest growth this month",
      data: trending,
    },
    {
      title: "✨ Newest Communities",
      value: "newest",
      description: "Fresh communities just getting started",
      data: newest,
    },
    {
      title: "👥 Communities by Members",
      value: "members",
      description: "Explore communities with the largest member bases",
      data: members,
    },
  ];

  return {
    filteredCommunities,
    subscribed,
    discover,
    filterItems,
    communityListItems,
  };
};
