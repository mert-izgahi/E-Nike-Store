import { Container } from "@/components/ui/container";
import Header from "../_components/Header";
import { Button } from "@/components/ui/button";
import { useModals } from "@/hooks/use-modals";
import { Modal } from "@/components/shared/modal";
import VariantForm from "@/components/forms/variant-form";
import { useGetVariantsQuery } from "@/redux/apis/variant.api";
import { useMemo, useState } from "react";
import { IVariant } from "@/lib/types";
import VariantCard from "./_components/VariantCard";
const Page = () => {
  const {
    CREATE_VARIANT_MODEL,
    openCreateVariantModal,
    closeCreateVariantModal,
  } = useModals();
  const { data, isLoading } = useGetVariantsQuery();
  const variants = useMemo(() => {
    return (data as any)?.variants || [];
  }, [data]) as IVariant[];
  const {
    UPDATE_VARIANT_MODEL,
    DELETE_VARIANT_MODEL,
    openUpdateVariantModal,
    openDeleteVariantModal,
    closeUpdateVariantModal,
    closeDeleteVariantModal,
  } = useModals();

  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);

  const handleOpenUpdateModal = (variant: IVariant) => {
    setSelectedVariant(variant);
    openUpdateVariantModal();
  };

  const handleOpenDeleteModal = (variant: IVariant) => {
    setSelectedVariant(variant);
    openDeleteVariantModal();
  };

  const handleCloseUpdateModal = () => {
    setSelectedVariant(null);
    closeUpdateVariantModal();
  };

  const handleCloseDeleteModal = () => {
    setSelectedVariant(null);
    closeDeleteVariantModal();
  };

  if (isLoading) {
    return <>Loading ...</>;
  }
  return (
    <>
      <Header title="Collections" />
      <Container className="py-6">
        <div className="flex flex-col gap-3 mb-6 border-b border-border pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl text-brand-500">Variants</h3>

            <Button type="button" onClick={openCreateVariantModal} size="sm">
              Create Variant
            </Button>

            <Modal
              title="Create Variant"
              description="Create a new variant"
              isOpen={CREATE_VARIANT_MODEL}
              onClose={() => {
                closeCreateVariantModal();
              }}
            >
              <VariantForm mode="create" />
            </Modal>
          </div>
          <p className="text-muted-foreground">Manage Products Variants</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {variants.map((variant, index) => (
            <VariantCard
              key={index}
              variant={variant}
              onOpenUpdateModal={() => handleOpenUpdateModal(variant)}
              onOpenDeleteModal={() => handleOpenDeleteModal(variant)}
            />
          ))}
          {selectedVariant && (
            <Modal
              title="Update Variant"
              description="Update a variant"
              isOpen={UPDATE_VARIANT_MODEL}
              onClose={() => {
                handleCloseUpdateModal();
              }}
            >
              <VariantForm mode="update" variant={selectedVariant} />
            </Modal>
          )}

          {selectedVariant && (
            <Modal
              title="Delete Variant"
              description="Delete a variant"
              isOpen={DELETE_VARIANT_MODEL}
              onClose={() => {
                handleCloseDeleteModal();
              }}
            >
              <VariantForm mode="delete" variant={selectedVariant} />
            </Modal>
          )}
        </section>
        {/* <SizesList /> */}
      </Container>
    </>
  );
};

export { Page };
