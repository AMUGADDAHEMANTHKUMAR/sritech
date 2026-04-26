import React, { FormEvent, useState } from 'react';

interface ContactErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzErh4NHpts6H7WruQZIUe9i7Oo5SgpfgGRRuPoNbMq510VyqKhbsVZC3SQ4ksxqsP3UQ/exec';
const WHATSAPP_NUMBER = '919494712989';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const nextErrors: ContactErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Full name is required.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!message.trim()) {
      nextErrors.message = 'Message is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    if (isSubmitting || !validateForm()) {
      return;
    }

    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone,
      message: message.trim()
    };

    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const whatsappText = `New Contact Inquiry! Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}, Message: ${formData.message}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`, '_blank');

      setSuccessMessage('Message sent successfully! We will contact you soon.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 bg-[#050505] py-20 text-white md:py-28">
      <div className="container">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 border border-white/15 bg-[#0b0b0b] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.35em] text-gray-500">
              Contact Us
            </p>
            <h2 className="mb-5 font-heading text-5xl font-black uppercase leading-none text-white md:text-7xl">
              Get In Touch
            </h2>
            <p className="max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-400">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="h-11 w-full border border-white/15 bg-[#050505] px-4 text-sm text-white outline-none transition-colors focus:border-white"
              />
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-400">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-11 w-full border border-white/15 bg-[#050505] px-4 text-sm text-white outline-none transition-colors focus:border-white"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-phone" className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-400">
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                required
                className="h-11 w-full border border-white/15 bg-[#050505] px-4 text-sm text-white outline-none transition-colors focus:border-white"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-400">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={5}
                className="w-full resize-none border border-white/15 bg-[#050505] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white"
              />
              {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full border border-white bg-white px-6 text-sm font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {successMessage && (
              <p className="border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-300">
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
