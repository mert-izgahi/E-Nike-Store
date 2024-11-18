import { PasswordSchema, passwordSchema } from "@/lib/zod";
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
  useSignOutMutation,
  useUpdatePasswordMutation,
} from "@/redux/apis/auth.api";
function PasswordForm() {
  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [signOut, { isLoading: isLoadingSignOut }] = useSignOutMutation();
  async function onSubmit(data: PasswordSchema) {
    await updatePassword({ args: data })
      .unwrap()
      .then(async () => {
        await signOut().unwrap();
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters long
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters long
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={isLoading || isLoadingSignOut}>
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
}

export default PasswordForm;
