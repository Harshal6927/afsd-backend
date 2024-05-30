let mongoose = require("mongoose");

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "completed", "deleted"],
        required: true,
        default: "active",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

let task = new mongoose.model("Task", schema);
module.exports = task;
