"use client";

import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export function LoginButton({
	children,
	mode = "redirect",
	asChild,
}: LoginButtonProps) {
	const router = useRouter();

	const handleClick = async () => {
		router.push("/auth/login");
	};

	if (mode === "modal") {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>
					<Button>{children}</Button>
				</DialogTrigger>
				<DialogContent className="p-0 border-none bg-transparent w-auto">
					<LoginForm />
				</DialogContent>
			</Dialog>
		);
	}

	return <Button onClick={handleClick}>{children}</Button>;
}
