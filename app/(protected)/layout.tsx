import { NavBar } from "@/app/(protected)/_components/navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

export default async function ProtectedLayout({
	children,
}: ProtectedLayoutProps) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-slate-300">
				<NavBar />
				{children}
			</div>
		</SessionProvider>
	);
}
