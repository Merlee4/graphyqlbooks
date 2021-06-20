const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

const uri =
  "mongodb://u1l1h9du1cr64doepctd:xuJHFBr9bX99jzr1UKry@b61fyzpfirdrw6i-mongodb.services.clever-cloud.com:27017/b61fyzpfirdrw6i";

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("database connected..."));
mongoose.connection.on("error", () => console.log("database error !!! ..."));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening in port ${port}`));
