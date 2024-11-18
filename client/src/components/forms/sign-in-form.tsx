import { SignInSchema, signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import SubmitButton from "../shared/submit-button";
import { useLazyGetMeQuery, useSignInMutation } from "@/redux/apis/auth.api";
import { useToast } from "@/hooks/use-toast";
function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "mert@mail.com",
      password: "Aa123456",
    },
  });

  const [signIn, { isLoading }] = useSignInMutation();
  const [getMe, { isLoading: isLoadingMe }] = useLazyGetMeQuery();
  const { toast } = useToast();
  async function onSubmit(data: SignInSchema) {
    await signIn({ credentials: data })
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>Enter your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
        <SubmitButton loading={isLoading || isLoadingMe}>Sign In</SubmitButton>
      </form>
    </Form>
  );
}

export default SignInForm;
