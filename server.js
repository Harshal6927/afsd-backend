const express = require("express");
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

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
