import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm md:text-base">
          © 2025 Dia Exotic. Tous droits réservés.
        </p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="/privacy" className="hover:text-yellow-700 transition">Politique de confidentialité</a>
          <a href="/terms" className="hover:text-yellow-700 transition">Conditions d'utilisation</a>
          <a href="/contact" className="hover:text-yellow-700 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
