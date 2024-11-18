import UserButton from "@/components/shared/user-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  return (
    <div className="h-16 flex flex-row items-center justify-between px-4 md:px-8 border-b border-border w-full">
      <div className="flex items-center space-x-3">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{props.title}</h1>
      </div>

      <UserButton />
    </div>
  );
}

export default Header;
