"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token: string | null,
) => {
	if (!token) return { error: "Missing token!" };

	const validatedFields = NewPasswordSchema.safeParse(values);

	if (!validatedFields.success) return { error: "Invalid fields!" };

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) return { error: "Invalid token!" };

	const hasExpired = new Date() > new Date(existingToken.expires);

	if (hasExpired) return { error: "Expired token!" };

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) return { error: "Invalid token!" };

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});

	await db.passwordResetToken.delete({ where: { id: existingToken.id } });

	return { success: "Password updated!" };
};
