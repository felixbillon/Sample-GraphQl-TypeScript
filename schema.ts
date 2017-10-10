import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import * as fs from 'fs';
import * as path from 'path';
import { mergeStrings } from 'gql-merge';

// const typeDefs = `
// type Query {
//     hello: String
//     user(id: Int): User
// }

// type Mutation {
//     createUser(name: String!, age: Int!): User!
// }

// type User {
//     id: Int!
//     firstName: String!
//     lastName: String!
//     posts: [Post]
// }

// type Post {
//     id: Int!
//     title: String!
//     text: String!
//     author: User!
// }

// schema {
//     query: Query
//     mutation: Mutation
// }
// `;

const typesDir = path.resolve(__dirname, 'schema');
const typeFiles = fs.readdirSync(typesDir);
const types = typeFiles.map(file => fs.readFileSync(path.join(typesDir, file), 'utf-8'));
const typeDefs = mergeStrings(types);

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});