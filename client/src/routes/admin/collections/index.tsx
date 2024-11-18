import { Container } from "@/components/ui/container";
import Header from "../_components/Header";
import { Button } from "@/components/ui/button";
import { useModals } from "@/hooks/use-modals";
import { Modal } from "@/components/shared/modal";
import CollectionForm from "@/components/forms/collection-form";
import CollectionsTable from "./_components/CollectionsTable";

const Page = () => {
  const {
    CREATE_COLLECTION_MODEL,
    openCreateCollectionModal,
    closeCreateCollectionModal,
  } = useModals();
  return (
    <>
      <Header title="Collections" />
      <Container className="py-6">
        <div className="flex flex-col gap-3 mb-6 border-b border-border pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl text-brand-500">Collections List</h3>

            <Button type="button" onClick={openCreateCollectionModal} size="sm">
              Create Collection
            </Button>

            {CREATE_COLLECTION_MODEL && (
              <Modal
                title="Create Collection"
                description="Create a new collection"
                isOpen={CREATE_COLLECTION_MODEL}
                onClose={() => {
                  closeCreateCollectionModal();
                }}
              >
                <CollectionForm mode="create" />
              </Modal>
            )}
          </div>
          <p className="text-muted-foreground">
            Here you can manage your categories
          </p>
        </div>

        <CollectionsTable />
      </Container>
    </>
  );
};

export { Page };
