import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Rating must have user"],
    },
    bookId: {
      type: mongoose.Schema.ObjectId,
      ref: "Book",
      required: [true, "Review must have book"],
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 0],
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ratingModel = mongoose.model("Rating", ratingSchema);
export default ratingModel;
