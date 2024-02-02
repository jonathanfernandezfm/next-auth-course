"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/index";
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
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const searchParams = useSearchParams();

	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "This account is already linked to another user."
			: searchParams.get("error")
			  ? "An error occurred. Please try again."
			  : "";

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values).then((data) => {
				if (data?.error) setError(data.error);
				if (data?.success) setSuccess(data.success);
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Sign in to your account"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
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
									<Button
										variant="link"
										size="sm"
										asChild
										className="px-0 font-normal"
									>
										<Link href={"/auth/reset"}>Forgot password?</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormNotification
						message={(error ? error : success) || urlError}
						type={urlError ? "error" : error ? "error" : "success"}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
