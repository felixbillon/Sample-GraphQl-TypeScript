import { users, posts } from './data'
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
export const resolvers = {
    Query: {
        hello() {
            return "Hello world!";
        },
        users() {
            return users;
        },
        user(root, { id }, ctx) {
            return users.find((user) => user.id === id);
        }
    },
    Mutation: {
        createUser(root, { firstName, lastName }) {
            const newUser = {
                id: users.length + 1,
                firstName,
                lastName
            }
            users.push(newUser);
            pubsub.publish('userAdded', { userAdded: newUser})
            return newUser;
        }
    },
    Subscription: {
        userAdded: {
          subscribe: () => pubsub.asyncIterator('userAdded')
        }
    },
    User: {
        posts(user) {
            return posts.filter((post) => user.posts && user.posts.indexOf(post.id) !== -1);
        }
    }
}