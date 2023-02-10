export enum Path {
  Home = "/",
  Details = "/products/:id",
  Favorites = "/favorites",
  Search = "/search",
}

export enum AdminPanelPath {
  Base = "/admin",
  Categories = "/admin/categories",
  Products = "/admin/products",
  Users = "/admin/users",
  CreateProduct = "/admin/products/create",
  EditProduct = "/admin/products/:productId/edit",
}

export enum AuthPath {
  Base = "/auth",
  Login = "/auth/login",
  Registration = "/auth/registration",
}

export enum AccountPath {
  Account = "/account",
}
