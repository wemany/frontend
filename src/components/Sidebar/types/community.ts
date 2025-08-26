export interface Community {
  id: string;
  name: string;
  alias: string;
  expires_at?: string | null;
  is_expired?: boolean | null;
}
