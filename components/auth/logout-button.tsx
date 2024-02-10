"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
	const onClick = async () => {
		await logout();
	};
	return (
		<button type="button" onClick={onClick} className="cursor-pointer w-full">
			{children}
		</button>
	);
}
