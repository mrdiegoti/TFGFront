export interface GameComment {
  id?: number;
  user: { id: number; name: string };
  game_id: string;
  content: string;
  created_at?: string;
}
