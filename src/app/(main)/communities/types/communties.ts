interface Plan {
  id: string;
  name: string;
  benefits: null | string[];
  description: string;
  currency: string;
  price: number;
  is_recurring: boolean;
}

interface Owner {
  name: string;
  avatar: null | string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  language: string;
  isSponsored: boolean;
  members: number;
  alias: string;
  posts: number;
  rating: number;
  reviews: number;
  category: string;
  created_at: string;
  tags: string[];
  image: string;
  coverImage: string;
  owner: Owner;
  planes: Plan[];
  isSubscribed?: boolean;
}

export type ApiComunities = {
  total: number;
  communities: Community[];
};
