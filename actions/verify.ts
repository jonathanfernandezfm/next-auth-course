"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verify = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);
	if (!existingToken) return { error: "Invalid token!" };

	const hasExpired = new Date() > new Date(existingToken.expires);

	if (hasExpired) return { error: "Expired token!" };

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) return { error: "Invalid token!" };

	await db.user.update({
		where: { email: existingToken.email },
		data: { emailVerified: new Date(), email: existingToken.email },
	});

	await db.verificationToken.delete({ where: { id: existingToken.id } });

	return { success: "Email verified. You can go back to login!" };
};
