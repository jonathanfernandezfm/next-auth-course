interface HeaderProps {
	label: string;
}

export function Header({ label }: HeaderProps) {
	return (
		<div className="w-full flex flex-col justify-center items-center gap-y-4">
			<h1 className="text-3xl font-semibold ">Auth</h1>
			<p className="text-muted-foreground">{label}</p>
		</div>
	);
}
