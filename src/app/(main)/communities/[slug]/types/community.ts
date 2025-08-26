export interface Achievement {
  type: string;
  title: string;
  point: string;
}

export interface Goal {
  title: string;
  progress: number;
  label: string;
}

export interface Community {
  communityId: string;
  nameCommunity: string;
  bannerUrl: string;
  logoUrl: string;
  description: string;
  publish: boolean;
  ownerId: string;
  founderEmail: string;
  founderCommunity: string;
  subscriberCount: string;
  profitsGenerated: string;
  category: string;
  levelUserInCommunity: number;
  progressUserInCommunity: number;
  streakDays: number;
  rankingPositionCommunity: number;
  modulesCount: string;
  plansCount: string;
  rolesCount: string;
  classesCount: string;
  postCount: string;
  eventsCount: string;
  LastAchievements: Achievement[];
  upcomingGoals: Goal[];
}

export interface CommunityData {
  community: Community;
  isMember: boolean;
  isExpired: boolean;
}
