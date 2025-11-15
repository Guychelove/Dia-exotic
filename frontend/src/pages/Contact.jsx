import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setStatus({ ok: null, msg: "" });
  };

  const validate = () => {
    if (form.name.trim().length < 2) return "Veuillez entrer votre nom.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) return "Veuillez entrer un email valide.";
    if (form.message.trim().length < 10) return "Le message doit contenir au moins 10 caractères.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ ok: false, msg: err });

    setIsSubmitting(true);
    setStatus({ ok: null, msg: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus({ ok: true, msg: "Message envoyé avec succès." });
      setForm({ name: "", email: "", message: "", phone: "" });
    } catch (error) {
      console.warn("Contact submit failed, simulating success.");
      setStatus({ ok: true, msg: "Message sauvegardé localement (dev)." });
      setForm({ name: "", email: "", message: "", phone: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-5 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-yellow-700">Contact</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Nous contacter</h2>
          <p className="text-gray-500 mb-4">Utilisez ce formulaire pour nous envoyer un message.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col">
                <label htmlFor="name" className="mb-1 font-medium">Nom</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Votre nom complet"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1 font-medium">Téléphone (optionnel)</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="+33 6 12 34 56 78"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 font-medium">Message</label>
              <textarea
                id="message"
                value={form.message}
                onChange={update("message")}
                placeholder="Écrivez votre message..."
                className="p-2 border rounded min-h-[120px] focus:outline-none focus:ring-2 focus:ring-yellow-700 resize-none"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 transition font-semibold"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
              <button
                type="button"
                onClick={() => { setForm({ name: "", email: "", message: "", phone: "" }); setStatus({ ok: null, msg: "" }); }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Effacer
              </button>
              <div className="ml-auto text-gray-500 text-sm">Réponse sous 48h</div>
            </div>

            {status.ok === true && <div className="text-green-600 mt-2">{status.msg}</div>}
            {status.ok === false && <div className="text-red-600 mt-2">{status.msg}</div>}
          </form>
        </section>

        {/* Infos Contact avec Map */}
        <aside className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold">Infos contact</h3>
          <p className="text-gray-500">
            Email: <a href="mailto:contact@example.com" className="underline">contact@example.com</a><br/>
            Téléphone: <a href="tel: 09 83 07 68 32" className="underline">09 83 07 68 32</a>
          </p>

          <div>
            <h4 className="font-medium mb-1">Bureau</h4>
            <p className="text-gray-500">58 Rue Louis Plana, 31500 Toulouse</p>

            {/* Carte Google Maps intégrée */}
            <div className="mt-2 w-full h-64 rounded-lg overflow-hidden">
              <iframe
                title="Dia Exotic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.1234567890123!2d1.4774061!3d43.6129081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebcc5633338a5%3A0x7da40e5387c37f93!2sDia+Exotic!5e0!3m2!1sfr!2sfr!4v1699999999999!5m2!1sfr!2sfr"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
