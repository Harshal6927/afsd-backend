import User from "./model/user.js";
import Task from "./model/task.js";

const resolvers = {
    Query: {
        getAllUsers: async (parent, args, context) => {
            return await User.find({});
        },
        getSingeUser: async (parent, args, context) => {
            return await User.findById(args.id);
        },
        getAllTasks: async (parent, args, context) => {
            return await Task.find({});
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
        createTask: async (parent, args, context) => {
            const newTask = new Task(args.task);
            return await newTask.save();
        },
        updateTask: async (parent, args, context) => {
            await Task.findByIdAndUpdate(args.id, args.task, {
                useFindAndModify: false,
            });
            return await Task.findById(args.id);
        },
        deleteTask: async (parent, args, context) => {
            await Task.deleteOne({ _id: args.id });
            return "Task deleted successfully!";
        },
    },
};

export default resolvers;
