const mongoose = require("mongoose");
const UserModel = require("./UserModel");
const { Schema } = mongoose;

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        photo: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
