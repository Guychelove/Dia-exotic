import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const isProductsPage = location.pathname.startsWith("/products");

  const productCategories = [
    { name: "Épices", path: "/products/epices" },
    { name: "Huile de palme", path: "/products/huile-de-palme" },
    { name: "Produits en carton", path: "/products/produits-en-carton" },
    { name: "Riz", path: "/products/riz" },
    { name: "Farine", path: "/products/farine" },
  ];

  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-2xl font-bold text-yellow-700">
            <NavLink to="/">Dia Exotic</NavLink>
          </div>

          {/* NAVIGATION */}
          <nav className="hidden md:flex gap-8 text-green-600 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-yellow-700 hover:text-green-600 transition"
              }
            >
              Accueil
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-yellow-700 hover:text-green-600 transition"
              }
            >
              Produits
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-yellow-700 hover:text-green-600 transition"
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition font-semibold"
            >
              Se connecter
            </NavLink>

            <NavLink
              to="/cart"
              className="relative text-2xl text-green-600 hover:text-yellow-700 transition"
            >
              🛒
              <span className="absolute -top-2 -right-2 bg-yellow-700 text-white text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </NavLink>
          </div>
        </div>
      </header>

      {/* SOUS-MENU PRODUITS */}
      {isProductsPage && (
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-5 py-3 flex justify-center gap-6">
            {productCategories.map((cat) => (
              <NavLink
                key={cat.path}
                to={cat.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-base font-medium rounded-md transition ${
                    isActive
                      ? "text-green-600 bg-green-100 shadow-inner"
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
