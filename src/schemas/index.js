import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime
  type Query {
    # Auth
    refreshAccessToken: TokenResponse!
    logoutUser: Boolean!

    # User
    getMe: UserResponse!
  }

  type Mutation {
    # Auth
    loginUser(input: LoginInput!): TokenResponse!
    signupUser(input: SignUpInput!): UserResponse!
    addNewBook(input: AddNewBookInput!): NewBookResponse!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
    passwordConfirm: String!
    photo: String
  }

  input AddNewBookInput {
    title: String!
    author: String!
    date: String!
    coverImage: String!
    collections: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  type TokenResponse {
    status: String!
    access_token: String!
  }

  type UserResponse {
    status: String!
    user: UserData!
  }

  type NewBookResponse {
    status: String!
    book: BookData!
  }

  type UserData {
    id: ID!
    name: String!
    email: String!
    photo: String!
    role: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type BookData {
    id: ID!
    title: String!
    author: String!
    date: String!
    coverImage: String!
    collections: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDefs;
