"use client"
import { Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { use, useState } from "react";
import { useForm, Controller } from "react-hook-form"
import { useTranslations, useLocale } from "next-intl";
import { signUpSchema, signUpSchemaType } from "../validators/signup.validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { errorMessage } from "@/utils/message";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/AuthApi";
import { AuthContext, AuthContextType } from "@/app/[locale]/(auth)/layout";
import VerificationCodeForm from "./VerificationCodeForm";
import ErrorField from "./ErrorField";
import SubmitButton from "./button/SubmitButton";

function SignUpForm() {
    const locale = useLocale()
    const t = useTranslations("auth")
    const [showPassword, setShowPassword] = useState(false);
    const { authState: { pending_Verification }, setAuthState } = use<AuthContextType>(AuthContext)
    const { mutateAsync, isPending } = useMutation({
        mutationFn: signUp,

    })
    const { handleSubmit, control, formState: { errors } } = useForm<signUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        mode: "all",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },

    })


    const submit = async (data: signUpSchemaType) => {
        try {
            await mutateAsync(data)
            setAuthState({ email: data.email, pending_Verification: true })
        } catch (error) {
            const axiosError = error
            errorMessage(axiosError)
        }
    }
    if (pending_Verification) {
        return <VerificationCodeForm />
    }

    return (
        <form onSubmit={handleSubmit(submit)}   >
            <Stack
                spacing={2}
                direction={"column"}
                sx={{ alignContent: "center", width: "100%" }} >
                <Typography variant="h1" sx={{ fontWeight: 200 }} >{t("signup")}</Typography>
                <Grid container spacing={2} >
                    <Controller
                        control={control}
                        name="firstName"
                        render={(({ field }) => {
                            return <Grid size={6} >
                                <TextField
                                    {...field}
                                    placeholder={t("firstName")}
                                    autoComplete="given-name"
                                />
                                <ErrorField message={errors.firstName?.message as string} />

                            </Grid>
                        })}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        render={(({ field }) => {
                            return <Grid size={6}>
                                <TextField
                                    {...field}
                                    autoComplete="family-name"
                                    placeholder={t("lastName")}

                                />
                                <ErrorField message={errors.lastName?.message as string} />
                            </Grid>
                        })}
                    />
                </Grid>
                <Controller
                    control={control}
                    name="email"
                    render={(({ field }) => {
                        return <>
                            <TextField
                                type="email"
                                {...field}
                                placeholder={t("email")}
                                autoComplete="email"
                            />
                            <ErrorField message={errors.email?.message as string} />
                        </>
                    })}
                />
                <Controller
                    control={control}
                    name="password"
                    render={(({ field }) => {
                        return <>
                            <TextField
                                {...field}
                                placeholder={t("password")}
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end"
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
                    })}
                />
                <SubmitButton loading={isPending} >
                    {t("signup")}
                </SubmitButton>
                <Typography variant="h6">
                    {t("alreadyHaveAccount")}
                    <Link href={`/${locale}/login`} className="font-bold text-sm">  {t("login")}</Link>
                </Typography>
            </Stack>
        </form>
    )
}

export default SignUpForm
