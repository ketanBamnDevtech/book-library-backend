import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    coverImage: {
      type: String,
      default: "default.png",
    },
    collections: {
      type: String,
      enum: ["want to read", "reading", "read"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookSchema.index({ title: 1 });

const bookModel = mongoose.model("Book", bookSchema);
export default bookModel;
