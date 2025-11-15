import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    // Simuler login
    alert(`Connexion avec ${form.email}`);
    setForm({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-yellow-700 text-center">Se connecter</h1>
        <p className="text-center text-gray-500 text-sm">Connectez-vous à votre compte Dia Exotic</p>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-2 rounded hover:bg-yellow-800 transition font-semibold"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Pas encore de compte? <a href="/register" className="text-yellow-700 hover:underline">S'inscrire</a>
        </div>
      </div>
    </div>
  );
}
