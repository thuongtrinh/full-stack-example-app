import type { AddFolderProps, GraphQLUserPayload } from "../interfaces/DataTypes";
import { graphQLRequest } from "./request";

export const foldersLoader = async () => {
  const query = `query {
    folders {
      id
      name
      createdAt
    }
  }`;

  const payload : GraphQLUserPayload = { query, variables: null };
  const data = await graphQLRequest(payload);
  console.log(data);
  return data;
};

export const addNewFolder = async (newFolder: AddFolderProps) => {
  const query = `mutation createFolder($name: String!, $authorId: ID!) {
    createFolder(name: $name, authorId: $authorId) {
      id
      name
      author {
        id uid name 
      }
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { name: newFolder.name, authorId: newFolder.authorId },
  });

  return data;
};
