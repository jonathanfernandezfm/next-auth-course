"use server";

import { z } from "zod";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();

	if (!user) {
		return { error: "Not authenticated!" };
	}

	const dbUser = await getUserById(user.id);

	if (!dbUser) {
		return { error: "Unauthorized!" };
	}

	if (user.isOAuth) {
		values.password = undefined;
		values.isTwoFactorEnabled = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcrypt.compare(
			values.password,
			dbUser.password,
		);

		console.log(values.password, dbUser.password);

		if (!passwordsMatch) {
			return { error: "Password is incorrect!" };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({
		where: { id: user.id },
		data: { ...values },
	});

	return { success: "Settings updated!" };
};
