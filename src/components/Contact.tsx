import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-gray-300 py-3 text-black placeholder-gray-400 text-sm font-body focus:outline-none focus:border-yellow-500 transition-colors duration-300";

  return (
    <section id="contact" className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-8 relative" ref={sectionRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-display text-black text-5xl md:text-7xl leading-none">
            Contact
          </h2>
          <div className="w-16 h-px bg-yellow-400 mx-auto mt-6 mb-6" />
          <p className="text-gray-400 text-sm font-body max-w-md mx-auto leading-relaxed">
            For commissions, collaborations, or simply to say hello.
            <br /> I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
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

          <textarea
            placeholder="Your message..."
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className={`${inputClass} resize-none`}
          />

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <button
              type="submit"
              className="bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-body hover:bg-yellow-400 hover:text-black transition-colors duration-300"
            >
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
