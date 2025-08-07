// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validação básica dos campos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Validação de e-mail
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    // Verifica variável de ambiente
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY não definida no ambiente." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: "Portfolio Rafael Gogge <onboarding@resend.dev>",
      to: ["dev.rafaelgogge@gmail.com"],
      subject: `[Portfolio] ${subject}`,
      html: `<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto;'>
        <h2 style='color: #3b82f6;'>Nova mensagem do Portfolio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      </div>`,
    });

    if (data.error) {
      // Garante que o erro seja sempre string
      const errorMsg = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Email enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    // Retorna erro detalhado para facilitar debug
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
