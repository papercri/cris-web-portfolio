import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Verificación de método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // 2. Extraer datos del body
  const { name, email, message } = req.body;

  // Validación básica de campos
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // 3. Configuración del transportador (Gmail App Password)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Tu Gmail
      pass: process.env.EMAIL_PASS, // Tu App Password de 16 letras
    },
  });

  try {
    // 4. Enviar el mail
    // Nota: Gmail sobreescribe el 'from' por tu propio email por seguridad, 
    // por eso usamos 'replyTo' para que puedas responderle al usuario directamente.
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      to: process.env.EMAIL_USER, 
      replyTo: email, 
      subject: `🚀 Web Contact: ${name}`,
      text: `Mensaje de: ${name} (${email})\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #2563eb;">Nuevo mensaje de contacto</h2>
          <p><strong>De:</strong> ${name} (${email})</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 20px;">Enviado desde tu portafolio personal.</p>
        </div>
      `,
    });

    // 5. Respuesta exitosa
    return res.status(200).json({ success: true, message: "Correo enviado" });
    
  } catch (error: any) {
    console.error('Error detallado:', error);
    return res.status(500).json({ 
      error: 'Error al enviar el correo', 
      details: error.message 
    });
  }
}