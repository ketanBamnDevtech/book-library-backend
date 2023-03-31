import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime
  scalar Upload
  type Query {
    # Auth
    refreshAccessToken: TokenResponse!
    logoutUser: Boolean!

    # User
    getMe: UserResponse!

    #Book
    allBooks(
      collection: String
      sortBy: SortBy
      filterByTitle: String
      filterByDate: String
    ): AllBookResponse!
  }

  enum SortBy {
    TITLE_ASC
    TITLE_DESC
    DATE_ASC
    DATE_DESC
  }

  type AllBookResponse {
    status: String!
    books: [AllBook!]
  }

  type AllBook {
    id: ID!
    title: String!
    author: String
    date: DateTime
    avgRating: Int!
    reviews: [myLibrary]
    coverImage: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Book {
    id: ID!
    title: String!
    author: String
    date: DateTime
    coverImage: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  enum Collection {
    WANT_TO_READ
    READING
    READ
  }

  type Mutation {
    # Auth
    loginUser(input: LoginInput!): TokenResponse!
    signupUser(input: SignUpInput!): UserResponse!
    addBook(
      title: String!
      author: String!
      date: String!
      coverImage: Upload
    ): NewBookResponse!
    addToLibrary(input: AddToLibraryInput!): AddToLibraryResponse!
    addRating(input: RatingInput!): RatingResponse!
    myBooks(input: MyBookInput!): MyBookResponse!
  }

  input MyBookInput {
    userId: String!
  }

  type MyBookResponse {
    status: String!
    myLibrary: [myLibrary]
  }

  input AddToLibraryInput {
    bookId: String!
    userId: String!
    collect: String!
    rating: Int!
  }

  type AddToLibraryResponse {
    status: String!
    myLibrary: myLibrary!
  }

  type myLibrary {
    id: ID!
    rating: Int!
    collect: String!
    bookId: Book!
    userId: UserData!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
    passwordConfirm: String!
    photo: String
  }

  input RatingInput {
    bookId: String!
    userId: String!
    rating: String!
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

  type RatingResponse {
    status: String!
    rating: RatingData!
  }

  type NewBookResponse {
    status: String!
    book: BookData!
  }

  type RatingData {
    id: ID!
    userId: ID!
    bookId: ID!
    rating: Int!
    createdAt: DateTime
    updatedAt: DateTime
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
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDefs;
