"use client";

import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Link,
    useTheme
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { use, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { login, } from "../api/AuthApi";
import { loginSchema, loginSchemaType } from "../validators/signin.validator";

import SubmitButton from "./button/SubmitButton";
import ErrorField from "./ErrorField";
import { AuthContext, AuthContextType } from "@/app/[locale]/(auth)/layout";
import VerificationCodeForm from "./VerificationCodeForm";
import { errorMessage } from "@/utils/message";
import { useRouter } from "next/navigation";
import { queryClient } from "@/design-system/components/providers";

type ErrorResponse = {
    message: string | string[];
    statusCode: number;
    error: string;
};

function LoginForm() {
    const router = useRouter()
    const theme = useTheme()
    const isArabic = theme.direction == "rtl"
    const [showPassword, setShowPassword] = useState(false);
    const { authState: { pending_Verification }, setAuthState } = use<AuthContextType>(AuthContext)
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: login,

       async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["me"],
            });

            router.push("/en/");
        },

        onError(error, variables) {
            if (!axios.isAxiosError<ErrorResponse>(error)) {
                errorMessage("Something went wrong");
                return;
            }

            if (error.response?.data?.statusCode === 403) {
                setAuthState(prev => ({
                    ...prev,
                    email: variables.email,
                    pending_Verification: true,
                }));

                return;
            }

            const message = error.response?.data?.message;

            errorMessage(
                Array.isArray(message)
                    ? message.join(", ")
                    : message || "Login failed"
            );
        }
    });

    const submit = async (data: loginSchemaType) => {
        await mutate(data);
    };

    if (pending_Verification) {
        return <VerificationCodeForm />
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Stack
                spacing={2}
                direction={"column"}
                sx={{ alignContent: "center", width: "100%" }} >
                <Typography variant="h4">Login</Typography>

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => {
                        return <>
                            <TextField
                                {...field}
                                placeholder="Email"
                                error={!!errors.email}

                            />
                            <ErrorField message={errors.email?.message as string} />

                        </>
                    }}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => {
                        return <>
                            <TextField
                                {...field}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                error={!!errors.password}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position={isArabic ? "start" : "end"}>
                                                <IconButton
                                                    onClick={() => setShowPassword((p) => !p)}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <ErrorField message={errors.password?.message as string} />

                        </>
                    }}
                />

                <SubmitButton loading={isPending} >
                    Login
                </SubmitButton>

                <Typography variant="h6">
                    I dont have an account
                    <Link href={"/en/signup"} className="font-bold text-sm">  sign up </Link>
                </Typography>
            </Stack>
        </form>
    );
}

export default LoginForm;