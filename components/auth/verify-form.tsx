"use client";

import { verify } from "@/actions/verify";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormNotification } from "@/components/auth/form-notification";
import { Loader } from "@/components/loader";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function VerifyForm() {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError("Missing token!");
			return;
		}

		verify(token)
			.then((data) => {
				if (data?.error) setError(data.error);
				if (data?.success) setSuccess(data.success);
			})
			.catch(() => {
				setError("Something went wrong!");
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming your email address"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<div className="flex items-center justify-center w-full">
				{!success && !error && <Loader />}
				<FormNotification
					message={success ? success : error}
					type={success ? "success" : "error"}
				/>
			</div>
		</CardWrapper>
	);
}
