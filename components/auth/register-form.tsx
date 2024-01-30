"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/index";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export function RegisterForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(() => {
			register(values).then((data) => {
				if (data.error) setError(data.error);
				if (data.success) setSuccess(data.success);
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonLabel="Already have an account?"
			backButtonHref="/auth/login"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={"John Doe"}
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type={"password"}
											placeholder={"******"}
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
						Create account
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
