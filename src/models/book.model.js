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
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookSchema.index({ title: 1 });

bookSchema.virtual("reviews", {
  ref: "MyLibrary",
  foreignField: "bookId",
  localField: "_id",
  select: true,
  populate: "userId",
});

const bookModel = mongoose.model("Book", bookSchema);
export default bookModel;
