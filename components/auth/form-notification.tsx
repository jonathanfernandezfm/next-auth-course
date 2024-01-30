import { cn } from "@/lib/utils";
import {
	CheckCircledIcon,
	ExclamationTriangleIcon,
	InfoCircledIcon,
} from "@radix-ui/react-icons";

interface FormNotificationProps {
	type?: "error" | "warning" | "info" | "success";
	message?: string;
}

export function FormNotification({
	message,
	type = "info",
}: FormNotificationProps) {
	if (!message) return null;

	return (
		<div
			className={cn(
				"bg-cyan-500/15 text-cyan-800 p-3 rounded-md flex items-center gap-x-2 text-sm",
				type === "error" && "bg-destructive/15 text-destructive",
				type === "info" && "bg-cyan-500/15 text-cyan-800",
				type === "success" && "bg-emerald-500/15 text-emerald-800",
				type === "warning" && "bg-amber-600/15 text-orange-800",
			)}
		>
			{type === "error" && <ExclamationTriangleIcon className="h-4 w-4" />}
			{type === "info" && <InfoCircledIcon className="h-4 w-4" />}
			{type === "success" && <CheckCircledIcon className="h-4 w-4" />}
			{type === "warning" && <ExclamationTriangleIcon className="h-4 w-4" />}
			<p>{message}</p>
		</div>
	);
}
