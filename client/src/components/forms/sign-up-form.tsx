import { SignUpSchema, signUpSchema } from "@/lib/zod";
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
import { useSignUpMutation } from "@/redux/apis/auth.api";
import { useToast } from "@/hooks/use-toast";
function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [signUp, { isLoading }] = useSignUpMutation();
  const { toast } = useToast();
  async function onSubmit(data: SignUpSchema) {
    await signUp({ credentials: data })
      .unwrap()
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
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
        <SubmitButton loading={isLoading}>Create Account</SubmitButton>
      </form>
    </Form>
  );
}

export default SignUpForm;
