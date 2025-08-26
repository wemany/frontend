interface NewsProps {
  community: string;
  title: string;
  time: string;
  type: string;
}

export interface CommunityNewsProps {
  news: NewsProps;
}
