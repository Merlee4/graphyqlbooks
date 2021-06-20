const graphql = require("graphql");
const PostModel = require("./mongoose/PostModel");
const UserModel = require("./mongoose/UserModel");

const UserType = new graphql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
    name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    post: {
      type: PostType,
      resolve(parent, args) {
        return PostModel.find({ userid: parent.id });
      },
    },
  }),
});

const PostType = new graphql.GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
    caption: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    userid: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
  }),
});

const RootQueryType = new graphql.GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) } },
      resolve(parent, args) {
        return UserModel.findById(args.id);
      },
    },
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find({});
      },
    },
    post: {
      type: PostType,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLID) } },
      resolve(parent, args) {
        return PostModel.findById(args.id);
      },
    },
    posts: {
      type: new graphql.GraphQLList(PostType),
      resolve(parent, args) {
        return PostModel.find({});
      },
    },
  },
});

const Mutation = new graphql.GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve(parent, args) {
        const user = new UserModel({
          name: args.name,
        });

        return user.save();
      },
    },
    addPost: {
      type: PostType,
      args: {
        caption: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        userid: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve(parent, args) {
        const post = new PostModel({
          caption: args.caption,
          userid: args.userid,
        });

        return post.save();
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
