import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useForm } from "@tanstack/react-form";
import { API } from "../lib/consts";

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      const response = await fetch(`${API}/v1/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    },
  });

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
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name field */}
            <form.Field
              name="name"
              validators={{
                onSubmit: ({ value }) =>
                  !value ? "Name is required" : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`${inputClass} ${
                      field.state.meta.errors.length > 0
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-red-400 text-xs">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email field */}
            <form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value) return "Email is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Invalid email address";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`${inputClass} ${
                      field.state.meta.errors.length > 0
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-red-400 text-xs">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Message field */}
          <form.Field
            name="message"
            validators={{
              onSubmit: ({ value }) =>
                !value ? "Message is required" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={`${inputClass} resize-none ${
                    field.state.meta.errors.length > 0
                      ? "border-red-400 focus:border-red-400"
                      : ""
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="text-red-400 text-xs">
                    {field.state.meta.errors[0]}
                  </span>
                )}
              </div>
            )}
          </form.Field>

          <motion.div
            className="text-center flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <form.Subscribe
              selector={(state) => ({
                isSubmitting: state.isSubmitting,
                isSubmitted: state.isSubmitted,
                hasErrors: state.errors.length > 0,
              })}
            >
              {({ isSubmitting, isSubmitted, hasErrors }) => (
                <>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-body hover:bg-yellow-400 hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : isSubmitted && !hasErrors
                        ? "Message Sent ✓"
                        : "Send Message"}
                  </button>

                  {isSubmitted && hasErrors && (
                    <p className="text-red-400 text-xs">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </>
              )}
            </form.Subscribe>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
