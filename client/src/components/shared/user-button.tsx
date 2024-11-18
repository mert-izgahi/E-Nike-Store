import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowLeft,
  Heart,
  LayoutDashboard,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { useMemo } from "react";
import { useSignOutMutation } from "@/redux/apis/auth.api";

interface UserButtonProps {
  className?: string;
}

function UserButton(props: UserButtonProps) {
  const { currentUser } = useAppSelector((store) => store.auth);
  const role = useMemo(() => {
    return currentUser?.role;
  }, [currentUser]);
  const [signOut] = useSignOutMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"link"} className={props.className}>
          Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem asChild>
          <Link to="/account/settings">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/wishlist">
            <Heart className="w-4 h-4 mr-2" />
            Wishlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/orders">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {role === "admin" && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={() => signOut()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
