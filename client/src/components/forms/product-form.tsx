import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import SubmitButton from "../shared/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { productSchema, ProductSchema } from "@/lib/zod";
import { ICategory, ICollection, IProduct, IVariant } from "@/lib/types";
import { useGetParentCategoriesQuery } from "@/redux/apis/category.api";
import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useGetCollectionsQuery } from "@/redux/apis/collection.api";
import { Textarea } from "../ui/textarea";
import { useGetVariantsQuery } from "@/redux/apis/variant.api";
import ImageField from "../shared/image-field";

interface ProductFormProps {
  mode: "create" | "update" | "delete";
  product?: IProduct;
}

interface ICategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function CategoryField({ value, onChange }: ICategoryFieldProps) {
  const { data, isLoading } = useGetParentCategoriesQuery();
  const categories = useMemo(() => {
    return (data as any)?.categories || [];
  }, [data]) as ICategory[];

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface ICollectionsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function CollectionsField({ value, onChange }: ICollectionsFieldProps) {
  const { data, isLoading } = useGetCollectionsQuery();
  const collections = useMemo(() => {
    return (data as any)?.collections || [];
  }, [data]) as ICollection[];

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {collections.map((collection) => (
          <SelectItem key={collection._id} value={collection._id}>
            {collection.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface ISubCategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
  category: string;
}

function SubCategoryField({
  value,
  onChange,
  category,
}: ISubCategoryFieldProps) {
  const { data, isLoading } = useGetParentCategoriesQuery();
  const categories = useMemo(() => {
    if (!category) return [];
    const selectedCategory = (data as any)?.categories?.find(
      (c: ICategory) => c._id === category
    );
    if (!selectedCategory) return [];
    return selectedCategory.subCategories || [];
  }, [data, category]) as ICategory[];

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={!category}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ProductForm(props: ProductFormProps) {
  const { mode, product } = props;

  //   const {
  //     closeDeleteCollectionModal,
  //     closeCreateCollectionModal,
  //     closeUpdateCollectionModal,
  //   } = useModals();

  //   const [createCollection, { isLoading: isCreating }] =
  //     useCreateCollectionMutation();
  //   const [updateCollection, { isLoading: isUpdating }] =
  //     useUpdateCollectionMutation();
  //   const [deleteCollection, { isLoading: isDeleting }] =
  //     useDeleteCollectionMutation();
  const { data } = useGetVariantsQuery();

  const variants = useMemo(() => {
    return (data as any)?.variants || [];
  }, [data]) as IVariant[];

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      category: (product?.category as string) || "",
      collectionn: (product?.collectionn as string) || "",
      subCategory: (product?.subCategory as string) || "",
      imageUrl: product?.imageUrl || "",
      variants: product?.variants || [],
    },
  });
  console.log(form.getValues());

  const onSubmit = async (data: ProductSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Enter product name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Category</FormLabel>
                <FormControl>
                  <CategoryField
                    value={field.value!}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Enter product name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <SubCategoryField
                    value={field.value!}
                    onChange={field.onChange}
                    category={form.watch("category")}
                  />
                </FormControl>
                <FormDescription>Enter product name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collectionn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <CollectionsField
                    value={field.value!}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Select a collection for this product, if any
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriotion</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
              </FormControl>
              <FormDescription>Describe your product in detail</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <div className="w-full flex items-center justify-start">
                  <ImageField value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
              <FormDescription>
                Upload a product image for this product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="variants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variants</FormLabel>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {variants.map((variant, index) => (
                    <div key={variant._id}>
                      <FormLabel>{variant.name}</FormLabel>
                      <Select
                        value={
                          //   form.watch(`variants.${index}.variantValue`) || ""
                          field.value.find((v) => v?.variant === variant._id)
                            ?.variantValue
                        }
                        onValueChange={(fieldValue) => {
                          form.setValue(
                            `variants.${index}.variant`,
                            variant._id
                          );
                          form.setValue(
                            `variants.${index}.variantValue`,
                            fieldValue
                          );
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          {variant.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormDescription>Describe your product in detail</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-end">
          <SubmitButton>Save</SubmitButton>
        </div>

        <pre>
          <code>{JSON.stringify(form.watch(), null, 2)}</code>
        </pre>
      </form>
    </Form>
  );
}

export default ProductForm;
