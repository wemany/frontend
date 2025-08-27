interface PricingPlan {
  id: string;
  name: string;
  color: string;
  benefits: string[] | null;
  description: string;
  currency: string;
  price: number;
  is_recurring: boolean;
}

export interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  avatar?: string;
  avatarFallback?: string;
  plans: PricingPlan[];
  stats: {
    members: number;
    rating: number;
    reviews: number;
  };
  onPlanSelect?: (price: number) => void;
}
