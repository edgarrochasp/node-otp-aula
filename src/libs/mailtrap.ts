import { MailtrapClient } from "mailtrap";

export const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 3440131 
    });

    try {
        await mailtrap.testing.send({
            from: { name: 'Sistema', email: 'sistema@email.com'},
            to: [{ email: to}],
            subject,
            text: body
        });
        console.log("✅ Email enviado com sucesso!");
        return true;
    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        return false;
    }
}