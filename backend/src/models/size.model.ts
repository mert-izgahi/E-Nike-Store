import mongoose, { Document } from "mongoose";

interface ISize extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Size already exist"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Size = mongoose.model<ISize>("Size", sizeSchema);

export { Size };
