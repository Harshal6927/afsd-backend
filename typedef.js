import { gql } from "graphql-tag";
import User from "./model/user.js";
import Task from "./model/task.js";

const typeDefs = gql`
    type User {
        id: String
        email: String!
        firstName: String!
        lastName: String!
        createdAt: String
        updatedAt: String
    }
    type Task {
        id: String
        title: String!
        description: String
        status: String!
        createdBy: String!
        assignedTo: String!
        createdAt: String
        updatedAt: String
    }

    input UserInput {
        email: String!
        firstName: String!
        lastName: String!
    }
    input TaskInput {
        title: String!
        description: String
        status: String!
        createdBy: String!
        assignedTo: String!
    }

    type Query {
        getAllUsers: [User]
        getSingeUser(id: String): User
        getAllTasks: [Task]
    }
    type Mutation {
        createUser(user: UserInput): User
        updateUser(id: String, user: UserInput): User
        deleteUser(id: String): String
        createTask(task: TaskInput): Task
        updateTask(id: String, task: TaskInput): Task
        deleteTask(id: String): String
    }
`;

export default typeDefs;
