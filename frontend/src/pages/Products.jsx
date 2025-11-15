import React, { useEffect, useMemo, useState } from "react";

/**
 * Products page — Alimentation exotique uniquement
 */

const mockProducts = [
    {
        id: 1,
        name: "Épices africaines",
        category: "Épices",
        price: 5.99,
        image: "https://via.placeholder.com/240x160?text=Epices",
        description: "Mélange d'épices authentiques pour vos plats.",
    },
    {
        id: 2,
        name: "Légumes secs",
        category: "Légumes",
        price: 3.5,
        image: "https://via.placeholder.com/240x160?text=Legumes",
        description: "Pois et haricots secs, idéals pour vos recettes exotiques.",
    },
    {
        id: 3,
        name: "Huile de palme",
        category: "Huiles",
        price: 6.2,
        image: "https://via.placeholder.com/240x160?text=Huile",
        description: "Huile de palme rouge, parfaite pour la cuisine africaine.",
    },
    {
        id: 4,
        name: "Riz parfumé",
        category: "Céréales",
        price: 4.99,
        image: "https://via.placeholder.com/240x160?text=Riz",
        description: "Riz parfumé spécial plats exotiques.",
    },
    {
        id: 5,
        name: "Farine de manioc",
        category: "Céréales",
        price: 7.5,
        image: "https://via.placeholder.com/240x160?text=Manioc",
        description: "Farine de manioc pour vos recettes traditionnelles.",
    },
];

export default function ProductsAlimentation() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/products/alimentation");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                if (mounted) setProducts(Array.isArray(data) ? data : mockProducts);
            } catch (err) {
                if (mounted) {
                    setError("Utilisation des données locales");
                    setProducts(mockProducts);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, []);

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        return ["all", ...Array.from(set)];
    }, [products]);

    const visible = useMemo(() => {
        let list = products.slice();

        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.description || "").toLowerCase().includes(q)
            );
        }

        if (category !== "all") {
            list = list.filter((p) => p.category === category);
        }

        if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

        return list;
    }, [products, query, category, sortBy]);

    if (loading) return <div className="max-w-7xl mx-auto p-6">Chargement…</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-yellow-700">Alimentation exotique</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    aria-label="Rechercher un produit"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
                >
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c === "all" ? "Tous types" : c}
                        </option>
                    ))}
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
                >
                    <option value="default">Trier</option>
                    <option value="price-asc">Prix ↑</option>
                    <option value="price-desc">Prix ↓</option>
                    <option value="name-asc">Nom A→Z</option>
                    <option value="name-desc">Nom Z→A</option>
                </select>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.length === 0 ? (
                    <p className="col-span-full text-gray-500">Aucun produit trouvé.</p>
                ) : (
                    visible.map((p) => (
                        <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                            <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-semibold text-lg">{p.name}</h3>
                                <p className="text-gray-600 text-sm flex-1 mt-1">{p.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="font-bold text-green-600">{p.price} €</span>
                                    <button className="bg-yellow-700 text-white px-3 py-1 rounded hover:bg-yellow-800 transition text-sm font-semibold">
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
