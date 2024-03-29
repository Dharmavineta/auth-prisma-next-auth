import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  console.log(email);

  await resend.emails
    .send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirmation email",
      html: `<p>Click <a href="${confirmLink}"> Here</a> to confirm email</p>`,
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};
