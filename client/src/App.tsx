import { Route, Routes } from "react-router-dom";
import Auth from "./lib/Auth";

import {
  RootLayout,
  RootHomePage,
  RootSignInPage,
  RootSignUpPage,
  RootForgotPasswordPage,
} from "./routes/root";
import {
  AccountLayout,
  AccountSettingsPage,
  AccountWishlistPage,
  AccountOrdersPage,
} from "./routes/root/account";
import {
  AdminLayout,
  AdminOverviewPage,
  AdminCategoriesPage,
  AdminCollectionsPage,
  AdminVariantsPage,
  AdminProductsPage,
  AdminCreateProductPage,
  AdminUpdateProductPage,
} from "./routes/admin";

function App() {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<RootHomePage />} />
          <Route path="sign-in" element={<RootSignInPage />} />
          <Route path="sign-up" element={<RootSignUpPage />} />
          <Route path="forgot-password" element={<RootForgotPasswordPage />} />

          <Route path="account" element={<AccountLayout />}>
            <Route path="settings" element={<AccountSettingsPage />} />
            <Route path="wishlist" element={<AccountWishlistPage />} />
            <Route path="orders" element={<AccountOrdersPage />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="collections" element={<AdminCollectionsPage />} />
          <Route path="variants" element={<AdminVariantsPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/create" element={<AdminCreateProductPage />} />
          <Route path="products/:id" element={<AdminUpdateProductPage />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
