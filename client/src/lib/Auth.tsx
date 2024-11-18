import { useAppSelector } from "@/redux/store";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Auth(props: PropsWithChildren) {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );
  const role = currentUser?.role;
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthRoute = ["/sign-in", "/sign-up", "/forgot-password"].includes(
    location.pathname
  );

  const isAccountRoute = location.pathname.includes("/account");
  const isAdminRoute = location.pathname.includes("/admin");

  useEffect(() => {
    // Redirect authenticated users away from auth pages
    if (isAuthenticated && isAuthRoute) {
      navigate("/");
    }

    // Redirect unauthenticated users to sign-in
    if (!isAuthenticated && (isAccountRoute || isAdminRoute)) {
      navigate("/sign-in");
    }

    // Redirect regular users away from admin routes
    if (isAuthenticated && role === "user" && isAdminRoute) {
      navigate("/");
    }
  }, [
    isAuthenticated,
    isAuthRoute,
    isAccountRoute,
    isAdminRoute,
    role,
    navigate,
  ]);

  return <>{props.children}</>;
}

export default Auth;
