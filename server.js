import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./typedef.js";
import resolvers from "./resolver.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

// load environment variables
dotenv.config();

// database connection
mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database Connected Successfully!!");
    })
    .catch((err) => {
        console.log("Could not connect to the database", err);
        process.exit();
    });

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const startServer = async () => {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        "/graphql",
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        })
    );

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`Server ready at http://localhost:4000/graphql`);
};

startServer();
