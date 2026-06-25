import { Box, Typography } from "@mui/material"
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LangaugeMenu from "@/design-system/components/ui/menus/LangaugeMenu";
import { useLocale } from "next-intl";

function LangaugeButton() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const locale=useLocale()
    const isOpen = Boolean(anchorEl);
    return (
        <Box sx={{ position: "relative" }}>
            <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
                
                sx={{
                    alignItems: "center",
                   display:"felx"
                }}>
                <Typography variant="h6" sx={{textTransform:"uppercase"}}>
                    {locale}
                </Typography>
                {!isOpen ? <ArrowDropDownIcon fontSize="small" /> : <ArrowDropUpIcon fontSize="small" />}
            </Box>
            <LangaugeMenu isOpen={isOpen} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Box>

    )
}

export default LangaugeButton
