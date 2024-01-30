import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
	return (
		<main className="flex h-full flex-col items-center justify-center bg-slate-300">
			<div className="space-y-6 text-center">
				<h1 className="text-4xl font-bold text-center text-slate-900">Auth</h1>
				<p>NextJS Authentication course</p>
				<div>
					<LoginButton>Sign in</LoginButton>
				</div>
			</div>
		</main>
	);
}
