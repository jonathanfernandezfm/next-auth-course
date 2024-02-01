import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function ErrorCard() {
	return (
		<CardWrapper
			headerLabel="Ops! Something went wrong"
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
		>
			<div className="w-full flex justify-center items-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	);
}
