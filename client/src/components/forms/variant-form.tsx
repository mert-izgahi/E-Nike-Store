import { VariantSchema, variantSchema } from "@/lib/zod";
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
import { IApiError, IVariant, IVariantOption } from "@/lib/types";
import ErrorAlert from "../shared/error-alert";
import {
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} from "@/redux/apis/variant.api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";

interface VariantFormProps {
  mode: "create" | "update" | "delete";
  variant?: IVariant;
}

interface OptionFieldProps {
  value: IVariantOption[];
  onChange: (options: IVariantOption[]) => void;
  setError: (error: string) => void;
}

function OptionsField(props: OptionFieldProps) {
  const { value, onChange, setError } = props;
  const [options, setOptions] = useState<IVariantOption[]>(value || []);
  const [label, setLabel] = useState("");
  const [val, setVal] = useState("");

  const updateLabel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setOptions((prevOptions) =>
        prevOptions.map((o, i) =>
          i === index ? { ...o, label: e.target.value } : o
        )
      );
    },
    []
  );

  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setOptions((prevOptions) =>
        prevOptions.map((o, i) =>
          i === index ? { ...o, value: e.target.value } : o
        )
      );
    },
    []
  );

  const addOption = useCallback(() => {
    if (!label || !val) {
      setError("Please enter both label and value");
      return;
    }
    if (options.some((o) => o.label === label || o.value === val)) {
      setError("Option already exists");
      return;
    }
    setOptions((prevOptions) => [...prevOptions, { label, value: val }]);
    setLabel("");
    setVal("");
  }, [label, val, options, setError]);

  const removeOption = useCallback((value: string) => {
    setOptions((prevOptions) => prevOptions.filter((o) => o.value !== value));
  }, []);

  useEffect(() => {
    onChange(options);
  }, [options, onChange]);

  // Memoize the rendered options to prevent unnecessary re-renders
  const renderedOptions = useMemo(
    () =>
      options.map((option, index) => (
        <div className="flex gap-2" key={index}>
          <Input
            placeholder="Label"
            className="flex-1"
            value={option.label}
            onChange={(e) => updateLabel(e, index)}
          />
          <Input
            placeholder="Value"
            className="flex-1"
            value={option.value}
            onChange={(e) => updateValue(e, index)}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => removeOption(option.value)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )),
    [options, updateLabel, updateValue, removeOption]
  );

  return (
    <div className="flex flex-col gap-4">
      {renderedOptions}
      <div className="flex gap-2">
        <Input
          placeholder="Label"
          className="flex-1"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <Input
          placeholder="Value"
          className="flex-1"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <Button type="button" size="icon" variant="ghost" onClick={addOption}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function VariantForm(props: VariantFormProps) {
  const { mode, variant } = props;
  const {
    closeDeleteVariantModal,
    closeCreateVariantModal,
    closeUpdateVariantModal,
  } = useModals();

  const [createVariant, { isLoading: isCreating, error: createError }] =
    useCreateVariantMutation();
  const [updateVariant, { isLoading: isUpdating, error: updateError }] =
    useUpdateVariantMutation();
  const [deleteVariant, { isLoading: isDeleting }] = useDeleteVariantMutation();
  const form = useForm<VariantSchema>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      name: variant?.name || "",
      options: variant?.options || [],
    },
  });

  const { toast } = useToast();
  async function onSubmit(data: VariantSchema) {
    if (mode === "create") {
      await createVariant({ args: data })
        .unwrap()
        .then(() => {
          closeCreateVariantModal();
          toast({
            title: "Created",
            description: "Variant created successfully",
          });
        });
    } else if (mode === "update") {
      await updateVariant({ variantId: variant?._id || "", args: data })
        .unwrap()
        .then(() => {
          closeUpdateVariantModal();
          toast({
            title: "Updated",
            description: "Variant updated successfully",
          });
        });
    }
    
  }

  const handleDelete = async () => {
    await deleteVariant({ variantId: variant?._id || "" })
      .unwrap()
      .then(() => {
        closeDeleteVariantModal();
        toast({
          title: "Deleted",
          description: "Variant deleted successfully",
        });
      });
  };

  if (mode === "delete") {
    return (
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to delete this Variant?</p>
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
        {updateError && <ErrorAlert error={updateError as IApiError} />}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Enter variant name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options</FormLabel>
              <FormControl>
                <OptionsField
                  onChange={field.onChange}
                  value={field.value}
                  setError={(error) =>
                    form.setError("options", { message: error })
                  }
                />
              </FormControl>
              <FormDescription>Enter variant name</FormDescription>
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

export default VariantForm;
