
import { Typography } from "@mui/material"
import { getTranslations } from "next-intl/server";

import { ReactNode } from "react"



async function SectionTitle({ title, children }: { title: string, children?: ReactNode }) {
      const t = await getTranslations();
    return (
        <Typography
            variant="h4"
            sx={{
                borderInlineStart: "4px solid",
                borderInlineStartColor: "#E50914",
                paddingInline: "10px",
                marginY: "20px",
                "&:first-letter": {
                    textTransform: "uppercase"
                }
            }}>
            {t(title)}
            {children}
        </Typography>
    )
}

export default SectionTitle
