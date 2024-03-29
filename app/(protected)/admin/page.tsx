"use client";

import { admin } from "@/actions/admin";
import { FormNotification } from "@/components/auth/form-notification";
import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function ServerPage() {
	const onAPIRouteClick = async () => {
		const response = await fetch("/api/admin");
		if (response.ok) {
			toast.success("Allowed API Route!");
		} else {
			toast.error("Not allowed API Route!");
		}
	};

	const onServerActionClick = async () => {
		const response = await admin();

		if (response.success) {
			toast.success(response.success);
		}

		if (response.error) {
			toast.error(response.error);
		}
	};

	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole="ADMIN">
					<FormNotification message="You are allowed!" type="info" />
				</RoleGate>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p>Admin-only API Route</p>
					<Button onClick={onAPIRouteClick}>Click to test</Button>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p>Admin-only Server Action</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
}
