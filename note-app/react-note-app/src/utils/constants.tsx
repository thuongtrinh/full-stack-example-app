export const GRAPHQL_SERVER: string = 'http://localhost:8080/graphql';
export const GRAPHQL_SUBSCRIPTION_ENDPOINT = 'wss://note-app-holetex-server.onrender.com/graphql';

export const REGISTER_USER = `mutation registerUser({$uid: String!, $email: String!, $displayName: String!}) {
            user(uid: $uid, email: $email, displayName: $displayName) {
              id userId email name createdAt lastLogin 
          }`
