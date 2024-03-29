import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "2FA Code",
		html: `<p>Your 2FA code is: <b>${token}</b></p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Reset your password",
		html: `<p>Click this link to reset your password: <a href="${resetLink}">Reset password</a></p>`,
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/verify?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Verify your email",
		html: `<p>Click this link to verify your email: <a href="${confirmLink}">Confirm link</a></p>`,
	});
};
