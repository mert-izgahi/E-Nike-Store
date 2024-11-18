import { z, TypeOf } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const accountSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  imageUrl: z.string().optional(),
});
export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long"),
  imageUrl: z.string().min(2, "Image url must be at least 2 characters long"),
  parent: z.string().optional(),
});

export const collectionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long"),
  imageUrl: z.string().min(2, "Image url must be at least 2 characters long"),
});

export const variantSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    options: z.array(
      z.object({
        label: z.string().min(2, "Label must be at least 2 characters long"),
        value: z.string().min(2, "Value must be at least 2 characters long"),
      })
    ),
  })
  .refine((data) => data.options.length > 0, {
    message: "Please add at least one option",
    path: ["options"],
  })
  .refine(
    (data) =>
      data.options.length ===
      new Set(data.options.map((option) => option.value)).size,
    {
      message: "Please add unique options",
      path: ["options"],
    }
  );

export const sizeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long"),
  category: z.string().min(2, "Category must be at least 2 characters long"),
  manyVariants: z.boolean(),
  subCategory: z.string().optional(),
  collectionn: z.string().optional(),
  price: z.number().min(0, "Price must be at least 0"),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  imageUrl: z.string().min(2, "Image url must be at least 2 characters long"),
  variants: z.array(
    z
      .object({
        variant: z
          .string()
          .min(2, "Variant must be at least 2 characters long"),
        variantValue: z
          .string()
          .min(2, "Variant value must be at least 2 characters long"),
      })
      .optional()
  ),
});

export type SignInSchema = TypeOf<typeof signInSchema>;
export type SignUpSchema = TypeOf<typeof signUpSchema>;
export type ForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>;
export type AccountSchema = TypeOf<typeof accountSchema>;
export type PasswordSchema = TypeOf<typeof passwordSchema>;
export type CategorySchema = TypeOf<typeof categorySchema>;
export type CollectionSchema = TypeOf<typeof collectionSchema>;
export type SizeSchema = TypeOf<typeof sizeSchema>;
export type VariantSchema = TypeOf<typeof variantSchema>;
export type ProductSchema = TypeOf<typeof productSchema>;
