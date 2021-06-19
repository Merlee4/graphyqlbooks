const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = graphql;

const findUserById = (source, args, parent) => {
  for (let i = 0; i <= source.length; i++) {
    if (args.id == source[i].id) {
      return source[i];
    }
  }
};

const findUserByAuthorId = (source, args, parent) => {
  for (let i = 0; i <= source.length; i++) {
    if (parent.authorid == source[i].id) {
      return source[i];
    }
  }
};

// sample data
const users = [
  {
    id: 1,
    name: "joe grand",
    genre: "sci-fi",
  },
  {
    id: 2,
    name: "micheal michez",
    genre: "action",
  },
  {
    id: 3,
    name: "mark zuck",
    genre: "tech",
  },
  {
    id: 4,
    name: "brad trav",
    genre: "tech",
  },
];

const posts = [
  {
    id: 15,
    caption: "i am at the planet",
    authorid: "1",
  },
  {
    id: 156,
    caption: "i can swim",
    authorid: "1",
  },
  {
    id: 21,
    caption: "there is a place in  my heart",
    authorid: "2",
  },
  {
    id: 42,
    caption: "i can swim",
    authorid: "3",
  },
  {
    id: 46,
    caption: "brad trav",
    authorid: "4",
  },
];

// Post Type
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    caption: { type: GraphQLString },
    authorid: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return findUserByAuthorId(users, args, parent);
      },
    },
  }),
});

// User  Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    post: {
      type: PostType,
      resolve(parent, args) {
        for (let i = 0; i <= posts.length; i++) {
          if (parent.id == posts[i].authorid) {
            return posts[i];
          }
        }
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return posts.filter((post) => post.authorid == parent.id);
      },
    },
  }),
});

// Main Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return findUserById(users, args, parent);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code goes here
        return findUserById(posts, args, parent);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return posts;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
