import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { ICollection } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { useModals } from "@/hooks/use-modals";
import { Modal } from "@/components/shared/modal";
import CollectionForm from "@/components/forms/collection-form";
import {
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
} from "@/redux/apis/collection.api";
import { useToast } from "@/hooks/use-toast";

function CollectionsTable() {
  const {
    UPDATE_COLLECTION_MODEL,
    DELETE_COLLECTION_MODEL,
    openUpdateCollectionModal,
    closeUpdateCollectionModal,
    openDeleteCollectionModal,
    closeDeleteCollectionModal,
  } = useModals();
  const [selectedCollection, setSelectedCollection] =
    useState<ICollection | null>(null);

  const {
    data,
    isLoading: isLoadingCollections,
    error: errorLoadingCollections,
  } = useGetCollectionsQuery();

  const collections = useMemo(() => {
    return (data as any)?.collections || [];
  }, [data]) as ICollection[];

  const [updateCollection] = useUpdateCollectionMutation();

  const { toast } = useToast();

  const handleChangeStatus = async (
    collectionId: string,
    args: ICollection
  ) => {
    await updateCollection({
      collectionId,
      args,
    })
      .unwrap()
      .then(() => {
        toast({
          title: "Updated",
          description: "Collection updated successfully",
        });
      });
  };

  const columns: ColumnDef<ICollection>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        // return info.row.original.status === "active" ? "Active" : "Inactive";
        return (
          <>
            <Switch
              checked={info.row.original.status === "active"}
              onCheckedChange={(checked) => {
                handleChangeStatus(info.row.original._id, {
                  ...info.row.original,
                  status: checked ? "active" : "inactive",
                });
              }}
            />
          </>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => dayjs(info.row.original.createdAt).format("DD/MM/YYYY"),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"}>
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedCollection(info.row.original);
                openUpdateCollectionModal();
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedCollection(info.row.original);
                openDeleteCollectionModal();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoadingCollections) {
    return <div>Loading...</div>;
  }

  if (errorLoadingCollections) {
    return <div>Error loading collections</div>;
  }

  return (
    <>
      <DataTable columns={columns} data={collections} searchKey="name" />
      {UPDATE_COLLECTION_MODEL && selectedCollection && (
        <Modal
          title="Update Category"
          description="Update Category Details"
          isOpen={true}
          onClose={() => {
            setSelectedCollection(null);
            closeUpdateCollectionModal();
          }}
        >
          <CollectionForm collection={selectedCollection} mode="update" />
        </Modal>
      )}

      {DELETE_COLLECTION_MODEL && selectedCollection && (
        <Modal
          title="Delete Category"
          description="Delete Category"
          isOpen={true}
          onClose={() => {
            setSelectedCollection(null);
            closeDeleteCollectionModal();
          }}
        >
          <CollectionForm collection={selectedCollection} mode="delete" />
        </Modal>
      )}
    </>
  );
}

export default CollectionsTable;
