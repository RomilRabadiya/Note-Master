const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link note to the logged-in user
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto fields
  }
);

module.exports = mongoose.model("Note", noteSchema);