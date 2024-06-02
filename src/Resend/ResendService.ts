import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_SECRET);


export const sendVerificationEmail = async (email: string, token:string) => {
    try {
        const confirmationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`
         const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Confirm your email address",
            html: `<p><strong>Click <a href="${confirmationLink}">here </a> to confirm your email</strong></p>`,
          });
        if (error) {
            console.error(error);
            return }
          return data
    } catch (error) {
        console.log(error);
    }
}