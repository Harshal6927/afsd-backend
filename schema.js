const { gql } = require("graphql-tag");

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
};

module.exports = { typeDefs, resolvers };
