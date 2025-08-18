interface CommentProps {
  author: string;
  content: string;
}

interface PostProps {
  id: number;
  communityId: number;
  communityName: string;
  communityAvatar: string;
  author: string;
  authorAvatar: string;
  authorLevel: number;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isSponsored: boolean;
  isPremium: boolean;
  previewComments: CommentProps[];
}

export interface PostCardProps {
  post: PostProps;
}
