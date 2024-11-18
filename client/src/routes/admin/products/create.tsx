import { Container } from "@/components/ui/container";
import Header from "../_components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductForm from "@/components/forms/product-form";

const Page = () => {
  return (
    <>
      <Header title="Create Product" />
      <Container className="py-6">
        <div className="flex flex-col gap-3 mb-6 border-b border-border pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl text-brand-500">Add new product</h3>

            <Button asChild variant={"outline"}>
              <Link to="/admin/products">Back</Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Add a new product to your store
          </p>
        </div>

        <ProductForm mode="create" />
      </Container>
    </>
  );
};

export { Page };
