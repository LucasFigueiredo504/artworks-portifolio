import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-gray-300 py-3 text-black placeholder-gray-400 text-sm font-body focus:outline-none focus:border-yellow-500 transition-colors duration-300";

  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-2xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
            Contact
          </h2>
          <div className="w-16 h-px bg-yellow-400 mx-auto mt-6 mb-6" />
          <p className="text-gray-400 text-sm font-body max-w-md mx-auto leading-relaxed">
            For commissions, collaborations, or simply to share what moves you —
            I'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Your message..."
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className={`${inputClass} resize-none`}
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-body hover:bg-yellow-400 hover:text-black transition-colors duration-300"
            >
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
