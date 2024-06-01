const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
    ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { typeDefs, resolvers } = require("./schema");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config({ path: __dirname + "/.env" });
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

app.use("/user", UserRoute);

app.get("/", (req, res) => {
    res.json({ message: "Hello Crud Node Express" });
});

// graphql

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
