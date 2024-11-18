import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId | null;
  collectionn: mongoose.Types.ObjectId | null;
  manyVariants: boolean;
  variants: [
    {
      type: {
        type: string;
        default: "ProductVariant";
        enum: ["ProductVariant"];
      };
      variant: mongoose.Types.ObjectId;
      variantValue: string;
      quantity: number;
      price: number;
      discount: number;
      imageUrl: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    collectionn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    manyVariants: {
      type: Boolean,
      default: false,
    },
    variants: [
      {
        type: {
          type: String,
          default: "ProductVariant",
          enum: ["ProductVariant"],
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
        },
        variantValue: {
          type: String,
          required: [true, "Please add a variant value"],
        },
        quantity: {
          type: Number,
          required: [true, "Please add a quantity"],
        },
        price: {
          type: Number,
          required: [true, "Please add a price"],
        },
        discount: {
          type: Number,
          default: 0,
        },
        imageUrl: {
          type: String,
          required: [true, "Please add an image"],
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


const Product = mongoose.model<IProduct>("Product", productSchema);

export { Product };