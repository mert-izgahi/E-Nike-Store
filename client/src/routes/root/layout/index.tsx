import { Outlet } from "react-router-dom";
import Header from "./_components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export { Layout };
