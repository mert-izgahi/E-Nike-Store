import { ICategory } from "@/lib/types";
import { CategorySchema, categorySchema } from "@/lib/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageField from "../shared/image-field";
import { Textarea } from "../ui/textarea";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/apis/category.api";
import { useToast } from "@/hooks/use-toast";
import { useModals } from "@/hooks/use-modals";
import { useMemo } from "react";

interface CategoryFormProps {
  mode: "create" | "update" | "delete";
  category?: ICategory;
}
function CategoryForm(props: CategoryFormProps) {
  const { mode, category } = props;
  const { data, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const categories = useMemo(() => {
    return (data as any)?.categories || [];
  }, [data]) as ICategory[];

  const {
    closeDeleteCategoryModal,
    closeCreateCategoryModal,
    closeUpdateCategoryModal,
  } = useModals();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      imageUrl: category?.imageUrl || "",
      parent: (category?.parent as string) || undefined,
    },
  });

  const { toast } = useToast();
  async function onSubmit(data: CategorySchema) {
    if (mode === "create") {
      await createCategory({ args: data })
        .unwrap()
        .then(() => {
          closeCreateCategoryModal();
          toast({
            title: "Created",
            description: "Category created successfully",
          });
        });
    } else if (mode === "update") {
      await updateCategory({ categoryId: category?._id || "", args: data })
        .unwrap()
        .then(() => {
          closeUpdateCategoryModal();
          toast({
            title: "Updated",
            description: "Category updated successfully",
          });
        });
    }
  }

  const handleDelete = async () => {
    await deleteCategory({ categoryId: category?._id || "" })
      .unwrap()
      .then(() => {
        closeDeleteCategoryModal();
        toast({
          title: "Deleted",
          description: "Category deleted successfully",
        });
      });
  };

  if (isLoadingCategories) {
    return <p>Loading...</p>;
  }

  if (mode === "delete") {
    return (
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to delete this category?</p>
        <SubmitButton
          onClick={handleDelete}
          loading={isDeleting}
          type="button"
          variant={"destructive"}
        >
          Delete
        </SubmitButton>
      </div>
    );
  }

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
              <FormDescription>Enter your name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormDescription>
                Enter a description for your category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageField value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Accepted file types: png, jpg, jpeg with a maximum size of 10MB
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={isCreating || isUpdating}>
          {mode === "create" && "Create"}
          {mode === "update" && "Update"}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default CategoryForm;
