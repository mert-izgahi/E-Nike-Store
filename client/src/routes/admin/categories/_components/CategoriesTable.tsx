import dayjs from "dayjs";
import { useGetCategoriesQuery } from "@/redux/apis/category.api";
import { useMemo, useState } from "react";
import { ICategory } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { useModals } from "@/hooks/use-modals";
import { Modal } from "@/components/shared/modal";
import CategoryForm from "@/components/forms/category-form";

function CategoriesTable() {
  const {
    UPDATE_CATEGORY_MODEL,
    DELETE_CATEGORY_MODEL,
    openUpdateCategoryModal,
    closeUpdateCategoryModal,
    openDeleteCategoryModal,
    closeDeleteCategoryModal,
  } = useModals();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const {
    data,
    isLoading: isLoadingCategories,
    error: errorLoadingCategories,
  } = useGetCategoriesQuery();

  const categories = useMemo(() => {
    return (data as any)?.categories || [];
  }, [data]) as ICategory[];

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "subCategories",
      header: "Sub Categories",
      cell: (info) => info.row.original.subCategories.length,
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
                setSelectedCategory(info.row.original);
                openUpdateCategoryModal();
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedCategory(info.row.original);
                openDeleteCategoryModal();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoadingCategories) {
    return <div>Loading...</div>;
  }

  if (errorLoadingCategories) {
    return <div>Error loading categories</div>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        searchKey="name"
      />
      {UPDATE_CATEGORY_MODEL && selectedCategory && (
        <Modal
          title="Update Category"
          description="Update Category Details"
          isOpen={true}
          onClose={() => {
            setSelectedCategory(null);
            closeUpdateCategoryModal();
          }}
        >
          <CategoryForm category={selectedCategory} mode="update" />
        </Modal>
      )}

      {DELETE_CATEGORY_MODEL && selectedCategory && (
        <Modal
          title="Delete Category"
          description="Delete Category"
          isOpen={true}
          onClose={() => {
            setSelectedCategory(null);
            closeDeleteCategoryModal();
          }}
        >
          <CategoryForm category={selectedCategory} mode="delete" />
        </Modal>
      )}
    </>
  );
}

export default CategoriesTable;
