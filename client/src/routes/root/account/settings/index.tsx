import AccountForm from "@/components/forms/account-form";
import PasswordForm from "@/components/forms/password-form";
import { Container } from "@/components/ui/container";

const Page = () => {
  return (
    <Container className="py-12">
      <div className="flex flex-col gap-2 mb-6 border-b border-border pb-6">
        <h2 className="text-4xl text-brand-500">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>
      <Container size={"md"} className="mb-24">
        <AccountForm />
      </Container>

      <div className="flex flex-col gap-2 mb-6 border-b border-border pb-6">
        <h2 className="text-4xl text-brand-500">Password & Security</h2>
        <p className="text-muted-foreground">
          Manage your password and security
        </p>
      </div>

      <Container size={"md"} className="mb-24">
        <PasswordForm />
      </Container>
    </Container>
  );
};

export { Page };
