import { Button } from "@/components/ui/button";

export function Social() {
	return (
		<div className="flex items-center w-full justify-center gap-x-2">
			<Button size={"lg"} variant={"outline"} className="w-full">
				Google
			</Button>
			<Button size={"lg"} variant={"outline"} className="w-full">
				Github
			</Button>
		</div>
	);
}
