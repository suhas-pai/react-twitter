export type User = {
  id: string;
  handle: string;
  displayName: string;
  iconUrl: string;
  bio: string;
  website: string;
  createdAt: Date;
  updatedAt: Date | null;
};
