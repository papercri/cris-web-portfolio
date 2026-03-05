import { useState } from 'react';

export default function ContactForm() {
  const [enviando, setEnviando] = useState(false);

  const enviarMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("¡Mensaje enviado!");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Error en el servidor");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviarMail} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <input name="name" placeholder="Tu nombre" required />
      <input name="email" type="email" placeholder="Tu email" required />
      <textarea name="message" placeholder="¿En qué puedo ayudarte?" required />
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}