import { ICategory } from "@/lib/types";
import { useGetParentCategoriesQuery } from "@/redux/apis/category.api";
import { useMemo } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function CategoriesMenu() {
  const {
    data,
    isLoading: isLoadingCategories,
    error: errorLoadingCategories,
  } = useGetParentCategoriesQuery();

  const categories = useMemo(() => {
    return (data as any)?.categories || [];
  }, [data]) as ICategory[];

  if (isLoadingCategories || errorLoadingCategories) {
    return null;
  }

  const MenuItem = ({ category }: { category: ICategory }) => {
    if (category.subCategories.length > 0) {
      return (
        <MenubarSub>
          <MenubarSubTrigger className="text-sm bg-transparent cursor-pointer">
            {category.name}
          </MenubarSubTrigger>
          <MenubarSubContent>
            {category.subCategories.map((subCategory) => (
              <MenubarItem key={subCategory._id} asChild className="cursor-pointer">
                <Link to={`/categories/${subCategory._id}`}>
                  {subCategory.name}
                  {subCategory.subCategories.length > 0 && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Link>
              </MenubarItem>
            ))}
          </MenubarSubContent>
        </MenubarSub>
      );
    }

    return (
      <MenubarItem asChild className="cursor-pointer">
        <Link to={`/categories/${category._id}`}>{category.name}</Link>
      </MenubarItem>
    );
  };

  return (
    <Menubar className="p-0 border-0 h-auto bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="text-sm bg-transparent cursor-pointer">
          Categories
          <ChevronDown className="ml-2 h-4 w-4" />
        </MenubarTrigger>
        <MenubarContent>
          {categories.map((category) => (
            <MenuItem key={category._id} category={category} />
          ))}

          <MenubarItem asChild className="cursor-pointer">
            <Link to="/categories">All Categories</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default CategoriesMenu;
