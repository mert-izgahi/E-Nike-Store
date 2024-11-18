import mongoose, { Document } from "mongoose";

export interface IVariant extends Document {
  name: string;
  options: {
    type: string;
    _id: string;
    label: string;
    value: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Variant already exist"],
    },
    options: [
      {
        type: {
          type: String,
          enum: ["VariantOption"],
          default: "VariantOption",
        },
        label: {
          type: String,
          required: [true, "Please add a label"],
        },
        value: {
          type: String,
          required: [true, "Please add a value"],
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Variant = mongoose.model<IVariant>("Variant", variantSchema);

export { Variant };
