import SignInForm from "@/components/forms/sign-in-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <Container className="py-12" size={"sm"}>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl text-brand-500">Sign In</h1>
        <p className="text-muted-foreground">
          Please sign in to your account to continue
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <SignInForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-brand-500 hover:underline">
              Sign Up
            </Link>
          </p>

          <p className="text-sm text-muted-foreground">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-brand-500 hover:underline">
              Reset Password
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
};

export { Page };
