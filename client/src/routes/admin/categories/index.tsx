import { Container } from "@/components/ui/container";
import Header from "../_components/Header";

import CategoriesTable from "./_components/CategoriesTable";
import { Button } from "@/components/ui/button";
import { useModals } from "@/hooks/use-modals";
import CategoryForm from "@/components/forms/category-form";
import { Modal } from "@/components/shared/modal";

const Page = () => {
  const {
    openCreateCategoryModal,
    CREATE_CATEGORY_MODEL,
    closeCreateCategoryModal,
  } = useModals();
  return (
    <>
      <Header title="Categories" />
      <Container className="py-6">
        <div className="flex flex-col gap-3 mb-6 border-b border-border pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl text-brand-500">Categories List</h3>

            <Button type="button" onClick={openCreateCategoryModal} size="sm">
              Create Category
            </Button>

            {CREATE_CATEGORY_MODEL && (
              <Modal
                title="Create Category"
                description="Create a new category"
                isOpen={true}
                onClose={() => {
                  closeCreateCategoryModal();
                }}
              >
                <CategoryForm mode="create" />
              </Modal>
            )}
          </div>
          <p className="text-muted-foreground">
            Here you can manage your categories
          </p>
        </div>

        <CategoriesTable />
      </Container>
    </>
  );
};

export { Page };
