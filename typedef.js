const { gql } = require("graphql-tag");
const User = require("./model/user");

const typeDefs = gql`
    type User {
        id: String
        email: String
        firstName: String
        lastName: String
        createdAt: String
        updatedAt: String
    }
    input UserInput {
        email: String
        firstName: String
        lastName: String
    }
    type Query {
        getAllUsers: [User]
        getSingeUser(id: String): User
    }
    type Mutation {
        createUser(user: UserInput): User
        updateUser(id: String, user: UserInput): User
        deleteUser(id: String): String
    }
`;

module.exports = { typeDefs };
