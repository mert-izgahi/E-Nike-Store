import SizeForm from "@/components/forms/size-form";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useModals } from "@/hooks/use-modals";
import { ISize } from "@/lib/types";
import { useGetSizesQuery } from "@/redux/apis/size.api";
import { Pencil, Trash } from "lucide-react";
import { useMemo } from "react";

function SizeItem({ size }: { size: ISize }) {
  const {
    UPDATE_SIZE_MODEL,
    DELETE_SIZE_MODEL,
    openUpdateSizeModal,
    openDeleteSizeModal,
    closeUpdateSizeModal,
    closeDeleteSizeModal,
  } = useModals();

  return (
    <div className="border border-border px-2 py-1 rounded-sm flex items-center">
      <p className="text-sm min-w-[8rem]">{size.name}</p>
      <Button
        size={"icon"}
        className="shrink-0"
        variant={"ghost"}
        type="button"
        onClick={() => {
          openDeleteSizeModal();
        }}
      >
        <Trash className="w-4 h-4" />
      </Button>
      <Button
        size={"icon"}
        className="shrink-0"
        variant={"ghost"}
        type="button"
        onClick={() => {
          openUpdateSizeModal();
        }}
      >
        <Pencil className="w-4 h-4" />
      </Button>

      {UPDATE_SIZE_MODEL && (
        <Modal
          title="Update Size"
          description="Update a size"
          isOpen={UPDATE_SIZE_MODEL}
          onClose={() => {
            closeUpdateSizeModal();
          }}
        >
          <SizeForm mode="update" size={size} />
        </Modal>
      )}
      {DELETE_SIZE_MODEL && (
        <Modal
          title="Delete Size"
          description="Delete a size"
          isOpen={DELETE_SIZE_MODEL}
          onClose={() => {
            closeDeleteSizeModal();
          }}
        >
          <SizeForm mode="delete" size={size} />
        </Modal>
      )}
    </div>
  );
}

function SizesList() {
  const { data } = useGetSizesQuery();

  const sizes = useMemo(() => {
    return (data as any)?.sizes || [];
  }, [data]) as ISize[];
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {sizes.map((size) => (
        <SizeItem key={size._id} size={size} />
      ))}
    </div>
  );
}

export default SizesList;
