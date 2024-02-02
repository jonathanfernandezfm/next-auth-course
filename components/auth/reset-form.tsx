"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormNotification } from "@/components/auth/form-notification";
import { useState, useTransition } from "react";
import { ResetSchema } from "@/schemas";
import { reset } from "@/actions/reset";

export function ResetForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			reset(values).then((data) => {
				if (data?.error) setError(data.error);
				if (data?.success) setSuccess(data.success);
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Sign in to your account"
			backButtonLabel="Go back to login"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={"john.doe@example.com"}
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormNotification
						message={error ? error : success}
						type={error ? "error" : "success"}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Reset
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
