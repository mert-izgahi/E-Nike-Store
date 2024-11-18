import { ICollection } from "@/lib/types";
import { CollectionSchema, collectionSchema } from "@/lib/zod";
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
import ImageField from "../shared/image-field";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useModals } from "@/hooks/use-modals";
import {
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from "@/redux/apis/collection.api";

interface CollectionFormProps {
  mode: "create" | "update" | "delete";
  collection?: ICollection;
}
function CollectionForm(props: CollectionFormProps) {
  const { mode, collection } = props;
  const {
    closeDeleteCollectionModal,
    closeCreateCollectionModal,
    closeUpdateCollectionModal,
  } = useModals();

  const [createCollection, { isLoading: isCreating }] =
    useCreateCollectionMutation();
  const [updateCollection, { isLoading: isUpdating }] =
    useUpdateCollectionMutation();
  const [deleteCollection, { isLoading: isDeleting }] =
    useDeleteCollectionMutation();

  const form = useForm<CollectionSchema>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection?.name || "",
      description: collection?.description || "",
      imageUrl: collection?.imageUrl || "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(data: CollectionSchema) {
    if (mode === "create") {
      await createCollection({ args: data })
        .unwrap()
        .then(() => {
          closeCreateCollectionModal();
          toast({
            title: "Created",
            description: "Collection created successfully",
          });
        });
    } else if (mode === "update") {
      await updateCollection({
        collectionId: collection?._id || "",
        args: data,
      })
        .unwrap()
        .then(() => {
          closeUpdateCollectionModal();
          toast({
            title: "Updated",
            description: "Collection updated successfully",
          });
        });
    }
  }

  const handleDelete = async () => {
    await deleteCollection({ collectionId: collection?._id || "" })
      .unwrap()
      .then(() => {
        closeDeleteCollectionModal();
        toast({
          title: "Deleted",
          description: "Collection deleted successfully",
        });
      });
  };

  if (mode === "delete") {
    return (
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to delete this collection?</p>
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
              <FormDescription>Enter collection name</FormDescription>
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
              <FormDescription>Enter collection description</FormDescription>
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

export default CollectionForm;
