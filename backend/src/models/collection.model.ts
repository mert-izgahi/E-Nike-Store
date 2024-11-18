import mongoose, { Document } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


const Collection = mongoose.model<ICollection>("Collection", collectionSchema);

export { Collection };
