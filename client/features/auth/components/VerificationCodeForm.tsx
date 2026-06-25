"use client";

import { AuthContext, AuthContextType } from "@/app/[locale]/(auth)/layout";
import { TextField, Stack, Typography, Paper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { use, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { emailVerification } from "../api/AuthApi";
import { AxiosError } from "axios";
import { errorMessage } from "@/utils/message";
import { useRouter } from "next/navigation";
import SubmitButton from "./button/SubmitButton";
import { useLocale } from "next-intl";

type FormData = {
    code: string[];
};

export default function VerificationCode() {
    const router = useRouter()
    const locale=useLocale()
    const { mutate, isPending, isIdle } = useMutation({
        mutationFn: emailVerification,
        onError: (error) => {
            const axiosError = error as AxiosError
            errorMessage(axiosError)
        },
        onSuccess: () => {
            router.replace(`/${locale}`)
        },

    })
    const { control, setValue, watch } = useForm<FormData>({
        defaultValues: {
            code: ["", "", "", "", "", ""],
        },
    });

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const { authState: { email } } = use<AuthContextType>(AuthContext)

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const current = watch("code");
        const updated = [...current];
        updated[index] = value;

        setValue("code", updated);

        // move next
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }


    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !watch("code")[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const verfiy = (email: string, code: string) => {
        mutate({
            email,
            code
        })

    }
    useEffect(() => {
        const current = watch("code").filter((el) => el)
        if (current.length == 6 && email && isIdle) {
            verfiy(email, current.join(""))

        }

    }, [watch("code")])

    const handleClick = () => {
        const current = watch("code").filter((el) => el)
        if (current.length == 6 && email) {
            verfiy(email, current.join(""))
        }
    }
    return (
        <Paper sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }} >
            <Typography
                variant="h1"
                sx={{ fontWeight: 500 }}
            >
                Verification Code
            </Typography>
            <Typography
                variant="h6"
                color="secondary"
                sx={{ fontWeight: 400 }} >
                We sent a 6-digit code your email
            </Typography>

            <Controller
                name="code"
                control={control}
                render={() => (
                    <Stack direction="row" spacing={2} sx={{ maxWidth: 550 }}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TextField
                                key={index}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                value={watch("code")[index]}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                variant="outlined"
                                inputMode="numeric"
                                disabled={isPending}
                                sx={{
                                    borderRadius: 1,
                                    "& .MuiInputBase-input": {
                                        textAlign: "center",
                                        fontSize: "20px",
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                )}
            />
            <SubmitButton
                loading={isPending}
                onClick={handleClick}
            >
                {isPending ? "verifing..." : "verify"}
            </SubmitButton>


        </Paper>
    );
}