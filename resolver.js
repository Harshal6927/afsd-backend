const User = require("./model/user");

const resolvers = {
    Query: {
        getAllUsers: async (parent, args, context) => {
            return await User.find({});
        },
        getSingeUser: async (parent, args, context) => {
            return await User.findById(args.id);
        },
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            const newUser = new User(args.user);
            return await newUser.save();
        },
        updateUser: async (parent, args, context) => {
            await User.findByIdAndUpdate(args.id, args.user, {
                useFindAndModify: false,
            });
            return await User.findById(args.id);
        },
        deleteUser: async (parent, args, context) => {
            await User.deleteOne({ _id: args.id });
            return "User deleted successfully!";
        },
    },
};

module.exports = { resolvers };
