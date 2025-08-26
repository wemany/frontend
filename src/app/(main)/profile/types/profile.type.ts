export interface Profile {
  full_name: string;
  phone: string;
  bio: string;
  avatar_url: string;
  brith_date: string;
  social_links: string;
}

export interface MyCommunities {
  id: string;
  name: string;
  description: string;
  alias: string;
  logoUrl: string;
  bannerUrl: string;
  tags: string[];
  created_at: string;
  subscriberCount: number;
}

export interface ApiDataProfile {
  profile: Profile;
  myCommunities: MyCommunities[];
}
