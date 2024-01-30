import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
	href: string;
	label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
	return (
		<Button className="w-full font-normal" size={"sm"} variant={"link"}>
			<Link href={href}>{label}</Link>
		</Button>
	);
}
