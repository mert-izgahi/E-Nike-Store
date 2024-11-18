import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
  imageUrl: string;
  parent: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Category already exist"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("subCategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema.pre("find", function (next) {
  this.populate("subCategories");
  next();
});

categorySchema.pre("findOne", function (next) {
  this.populate("subCategories");
  next();
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export { Category };
