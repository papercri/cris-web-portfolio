import { Linkedin } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };
const VP2 = { once: false, margin: '-40px' };

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
  ];

  return (
    <section id="contact" className="min-h-screen py-32 px-8 bg-[#1A1A1A] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-white/30" />
          <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
            CONTACT
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — slide in from left */}
          <div>
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-10"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, ease, delay: 0.05 }}
            >
              Let&apos;s<br />connect.
            </motion.h2>

            <motion.p
              className="text-white/50 text-lg leading-relaxed mb-12 max-w-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.85, ease, delay: 0.18 }}
            >
              Always open to interesting projects and great collaborations.
              Whether you have a question or just want to say hi — reach out.
            </motion.p>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.85, ease, delay: 0.28 }}
            >
              <a
                href="mailto:cristiana.sollini@gmail.com"
                className="block text-white text-xl font-semibold hover:opacity-60 transition-opacity border-b border-white/15 pb-6"
              >
                Send me an email ↗
              </a>
              <a
                href="https://www.linkedin.com/in/cristianasollini/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 font-semibold hover:text-white transition-colors pt-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn Profile
              </a>
            </motion.div>
          </div>

          {/* Right: form — slide in from right */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {fields.map((field, i) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP2}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
              >
                <label htmlFor={field.id} className="block mb-2 text-xs font-semibold tracking-widest uppercase text-white/40">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder:text-white/25 focus:outline-none focus:border-white/60 transition-colors"
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.8, delay: 0.32, ease }}
            >
              <label htmlFor="message" className="block mb-2 text-xs font-semibold tracking-widest uppercase text-white/40">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder:text-white/25 focus:outline-none focus:border-white/60 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.button
              type="submit"
              className="mt-4 px-8 py-4 bg-white text-[#1A1A1A] text-sm font-semibold tracking-widest uppercase hover:opacity-80 transition-opacity"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.7, delay: 0.44, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
