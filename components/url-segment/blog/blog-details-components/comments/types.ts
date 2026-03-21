export interface CommentUser {
  id: string;
  name?: string | null;
  image?: string | null;
  email?: string | null;
}

export interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isDeleted: boolean;
  parentId?: string | null;
  postId?: string | null;
  userId: string;
  user?: CommentUser | null;
  replies?: CommentData[];
}

export interface CommentSectionProps {
  postId: string;
  currentUserId?: string | null;
  isAuthenticated: boolean;
}
