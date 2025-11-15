import React from "react";
import { Link } from "react-router-dom";

const sampleProducts = [
  { id: 1, name: "Plante A", price: "€24", desc: "Feuilles exotiques, facile à entretenir." },
  { id: 2, name: "Plante B", price: "€32", desc: "Couleurs vives, parfaite pour intérieur." },
  { id: 3, name: "Accessoire", price: "€12", desc: "Pot décoratif en céramique." },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-12 font-sans text-gray-800">
      {/* Hero */}
      <header className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Bienvenue chez Dia-exotic</h1>
          <p className="text-gray-600 mb-4">
            Collections de plantes et accessoires exotiques — choisissez des plantes adaptées à votre intérieur.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/catalog"
              className="bg-yellow-700 text-white px-5 py-2 rounded hover:bg-yellow-800 transition font-semibold"
            >
              Voir le catalogue
            </Link>
            <Link
              to="/about"
              className="border border-yellow-700 text-yellow-700 px-5 py-2 rounded hover:bg-yellow-50 transition font-semibold"
            >
              En savoir plus
            </Link>
          </div>
        </div>
        <img
          src="https://via.placeholder.com/560x360?text=Dia-exotic"
          alt="Plantes exotiques"
          className="w-full md:w-80 h-auto object-cover rounded-lg bg-gray-200"
        />
      </header>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pourquoi choisir Dia-exotic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Qualité garantie</strong>
            <p>Plantes et accessoires sélectionnés pour la durabilité et la beauté.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Conseils d'entretien</strong>
            <p>Guides clairs pour garder vos plantes en pleine santé.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Livraison rapide</strong>
            <p>Expédition soignée et suivie partout en France.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Aperçu des produits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sampleProducts.map((p) => (
            <article key={p.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <img
                src={`https://via.placeholder.com/400x240?text=${encodeURIComponent(p.name)}`}
                alt={p.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-1">{p.name} — {p.price}</h3>
                <p className="text-gray-600 flex-1">{p.desc}</p>
                <Link
                  to={`/products/${p.id}`}
                  className="mt-3 border border-yellow-700 text-yellow-700 text-center py-2 rounded hover:bg-yellow-50 transition"
                >
                  Détails
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 pt-6 text-gray-600 text-sm">
        <div>Contact: contact@dia-exotic.example</div>
        <div className="mt-2">
          <Link to="/terms" className="text-yellow-700 hover:underline">Conditions</Link> ·{" "}
          <Link to="/privacy" className="text-yellow-700 hover:underline">Confidentialité</Link>
        </div>
      </footer>
    </main>
  );
}
