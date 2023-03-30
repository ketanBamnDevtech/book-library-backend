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
    collect: {
      type: String,
      enum: ["WANT_TO_READ", "READING", "READ"],
      default: "WANT_TO_READ",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookSchema.index({ title: 1 });

const bookModel = mongoose.model("Book", bookSchema);
export default bookModel;
