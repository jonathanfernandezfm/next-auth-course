"use client";

import { Button } from "@/components/ui/button";
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

	return <Button onClick={handleClick}>{children}</Button>;
}
