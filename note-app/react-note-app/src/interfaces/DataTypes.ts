export interface UserDTO {
  id: number;
  uid: string;
  displayName: string | null;
  email: string | null;
  accessToken: string | null;
  photoURL: string | null;
}

export interface GraphQLParam {
  uid?: string | undefined;
  email?: string | null | undefined;
  displayName?: string | null | undefined;
  folderId?: number | null | undefined;
  noteId?: number | null | undefined;
  name?: string | null | undefined;
  authorId?: string | null | undefined;
  note?: NoteInput | null | undefined;
  id?: number | null | undefined;
}

export interface GraphQLUserPayload {
  query: string;
  variables: GraphQLParam | null;
}

export interface FolderDTO {
  id: string | null;
  name: string | null;
}

export interface FolderListProps {
  folders: FolderDTO[];
}

export interface FolderByIDProps {
  id: string | null;
  name: string | null;
  notes: NoteDTO[];
}

export interface NoteDTO {
  id: string | null;
  content: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AddFolderProps {
  name: string | null;
  authorId: string | null;
}

export interface NoteInput {
  content: string | null | undefined;
  authorId: string | null | undefined;
  folderId: string | null | undefined;
}
