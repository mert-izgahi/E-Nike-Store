import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, ShoppingBag, Sidebar } from "lucide-react";
import SearchField from "@/components/shared/search-field";
import { useAppSelector } from "@/redux/store";
import UserButton from "@/components/shared/user-button";
import CategoriesMenu from "./CategoriesMenu";

function Header() {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((store) => store.auth);
  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  return (
    <div className="flex flex-col">
      {/* Tobbar */}
      <div className="bg-brand-600 text-white h-8">
        <Container className="flex items-center h-full justify-end md:justify-between">
          <p className="text-sm font-medium hidden md:inline">
            Free Shipping on all orders over $50
          </p>

          {!isAuthenticated && (
            <Button asChild variant={"link"} className="text-white">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}

          {isAuthenticated && <UserButton className="text-white" />}
        </Container>
      </div>
      {/* END OF Tobbar */}

      {/* Navbar */}
      <div className="bg-zinc-50  h-16">
        <Container className="flex items-center h-full">
          <div className="flex-1 flex justify-start">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <img src="/assets/logo.png" alt="" className="w-9" />
            </Link>

            <ul className=" hidden md:flex items-center gap-4 ml-4">
              {links.map((link) => (
                <li
                  key={link.name}
                  className={cn("text-sm font-medium", {
                    "underline underline-offset-4":
                      location.pathname === link.href,
                  })}
                >
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}

              <li className="text-sm font-medium">
                <CategoriesMenu />
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center ">
            <SearchField />
          </div>
          <div className="flex-1">
            <ul className="flex items-center gap-4 justify-end">
              <li className="text-sm font-medium">
                <Link to="/cart" className="flex items-center gap-1.5">
                  <ShoppingBag className="w-5 h-5" />
                </Link>
              </li>
              <li className="text-sm font-medium">
                <Link
                  to="/account/wishlist"
                  className="flex items-center gap-1.5"
                >
                  <Heart className="w-5 h-5" />
                </Link>
              </li>
              {/* {!isAuthenticated && (
                <li className="text-sm font-medium">
                  <Button asChild variant={"outline"}>
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                </li>
              )}

              {isAuthenticated && (
                <li className="text-sm font-medium">
                  <UserButton />
                </li>
              )} */}

              <li className="text-sm font-medium inline-block md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size={"icon"} variant={"outline"}>
                      <Sidebar className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="border-l border-l-transparent">
                    <SheetHeader className="">
                      <SheetTitle>DecorX</SheetTitle>
                      <SheetDescription>Best Decor Shop</SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col space-y-2 my-4">
                      {links.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className={cn("text-sm font-medium", {
                            "underline underline-offset-4":
                              location.pathname === link.href,
                          })}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Header;
