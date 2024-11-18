import SignUpForm from "@/components/forms/sign-up-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <Container className="py-12" size={"sm"}>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl text-brand-500">Sign Up</h1>
        <p className="text-muted-foreground">
          Please provide your details to create an account
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-brand-500 hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
};

export { Page };
