"use client";

import { FormNotification } from "@/components/auth/form-notification";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}

export function RoleGate({ children, allowedRole }: RoleGateProps) {
	const role = useCurrentRole();

	if (role !== allowedRole) {
		return (
			<FormNotification
				message="You do not have enough permissions"
				type="error"
			/>
		);
	}

	return <>{children}</>;
}
