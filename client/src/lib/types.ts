export interface IApiError {
  status: number;
  message: string;
  title: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  imageUrl: string;
  status: string;
  role: string;
  isVerified: boolean;
  verifyToken: string | undefined;
  verifyTokenExpires: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  parent: ICategory | string | null;
  subCategories: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollection {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVariantOption {
  label: string;
  value: string;
}

export interface IVariant {
  _id: string;
  name: string;
  options: IVariantOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISize {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: ICategory | string;
  subCategory: ICategory | string | null;
  collectionn: ICollection | string | null;
  manyVariants: boolean;
  variants: {
    variant: string;
    variantValue: string;
  }[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
