
import { Typography } from '@mui/material'
import React from 'react'
import { useTranslations } from "next-intl";

function ErrorField({ message }: { message: string | null }) {
    const t = useTranslations("validation");
    return (
        <Typography variant="body2" color='error'>
            {message ? t(message as any) : null}
        </Typography>
    )
}

export default ErrorField
