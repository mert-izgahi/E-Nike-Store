import { SizeSchema, sizeSchema } from "@/lib/zod";
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
import { useToast } from "@/hooks/use-toast";
import { useModals } from "@/hooks/use-modals";
import {
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} from "@/redux/apis/size.api";
import { IApiError, ISize } from "@/lib/types";
import ErrorAlert from "../shared/error-alert";

interface SizeFormProps {
  mode: "create" | "update" | "delete";
  size?: ISize;
}
function SizeForm(props: SizeFormProps) {
  const { mode, size } = props;
  const { closeDeleteSizeModal, closeCreateSizeModal, closeUpdateSizeModal } =
    useModals();

  const [createSize, { isLoading: isCreating, error: createError }] =
    useCreateSizeMutation();
  const [updateSize, { isLoading: isUpdating, error: updateError }] =
    useUpdateSizeMutation();
  const [deleteSize, { isLoading: isDeleting }] = useDeleteSizeMutation();
  const form = useForm<SizeSchema>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: size?.name || "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(data: SizeSchema) {
    if (mode === "create") {
      await createSize({ args: data })
        .unwrap()
        .then(() => {
          closeCreateSizeModal();
          toast({
            title: "Created",
            description: "Size created successfully",
          });
        });
    } else if (mode === "update") {
      await updateSize({ sizeId: size?._id || "", args: data })
        .unwrap()
        .then(() => {
          closeUpdateSizeModal();
          toast({
            title: "Updated",
            description: "Size updated successfully",
          });
        });
    }
  }

  const handleDelete = async () => {
    await deleteSize({ sizeId: size?._id || "" })
      .unwrap()
      .then(() => {
        closeDeleteSizeModal();
        toast({
          title: "Deleted",
          description: "Size deleted successfully",
        });
      });
  };

  if (mode === "delete") {
    return (
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to delete this size?</p>
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
        {createError && <ErrorAlert error={createError as IApiError} />}
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
        <SubmitButton loading={isCreating || isUpdating}>
          {mode === "create" && "Create"}
          {mode === "update" && "Update"}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default SizeForm;
