import { PrismaClient } from "@prisma/client";

declare global {
	// biome-ignore lint/style/noVar: var is needed for globalThis
	var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	if (!globalThis.prisma) {
		globalThis.prisma = db;
	}
}
