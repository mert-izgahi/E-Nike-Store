import { Container } from "@/components/ui/container";
import Header from "../_components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <>
      <Header title="Products" />
      <Container className="py-6">
        <div className="flex flex-col gap-3 mb-6 border-b border-border pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl text-brand-500">Products List</h3>

            <Button asChild>
              <Link to="/admin/products/create">Create Product</Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Here you can manage your products
          </p>
        </div>
      </Container>
    </>
  );
};

export { Page };
