"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function Social() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const onClick = async (provider: "google" | "github") => {
		await signIn(provider, {
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="flex items-center w-full justify-center gap-x-2">
			<Button
				size={"lg"}
				variant={"outline"}
				className="w-full"
				onClick={() => {
					onClick("google");
				}}
			>
				Google
			</Button>
			<Button
				size={"lg"}
				variant={"outline"}
				className="w-full"
				onClick={() => {
					onClick("github");
				}}
			>
				Github
			</Button>
		</div>
	);
}
