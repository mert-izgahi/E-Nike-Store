import { AccountSchema, accountSchema } from "@/lib/zod";
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
import { useAppSelector } from "@/redux/store";
import { useLazyGetMeQuery, useUpdateMeMutation } from "@/redux/apis/auth.api";
import { useUploadImageMutation } from "@/redux/apis/storage.api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function AccountForm() {
  const { currentUser } = useAppSelector((store) => store.auth);
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [uploadImage, { isLoading: isLoadingImage }] = useUploadImageMutation();
  const [getMe, { isLoading: isLoadingMe }] = useLazyGetMeQuery();
  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      imageUrl: currentUser?.imageUrl || "",
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  async function onSubmit(data: AccountSchema) {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const result = await uploadImage({ args: formData }).unwrap();
      data.imageUrl = result.url;
    }

    await updateMe({ args: data })
      .unwrap()
      .then(() => getMe())
      .catch((error) => {
        const errorMessage = error?.data?.message || "Something went wrong!";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-row items-center justify-start">
          <img
            src={form.watch("imageUrl")}
            alt="user profile picture"
            className="w-12 h-12 rounded-full object-cover"
          />
          <label
            htmlFor="imageUrl"
            className="ml-2 text-sm font-semibold text-gray-900 cursor-pointer"
          >
            Upload Image
          </label>
          <input
            id="imageUrl"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                form.setValue("imageUrl", url);
                setImageFile(file);
              }
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your first name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your last name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} readOnly />
              </FormControl>
              <FormDescription>Enter your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your phone number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                    }
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <SubmitButton loading={isLoading || isLoadingMe || isLoadingImage}>
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AccountForm;
