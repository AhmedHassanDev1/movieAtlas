import { menuProfileList } from "@/constants/lists/menu";
import { logout } from "@/features/auth/api/AuthApi";
import useAuth from "@/hooks/useAuth";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";


export type MenuPropsType = {
    anchorEl: null | HTMLElement
    isOpen: boolean
    setAnchorEl: (anchorEl: null | HTMLElement) => void
}


function ProfileMenu({ anchorEl, isOpen, setAnchorEl }: MenuPropsType) {
    const { isSuccess, data } = useAuth()
    const locale = useLocale()
  
  
    const t=useTranslations()
    const { mutate } = useMutation({
        mutationFn: logout,
        mutationKey: ["logout"],
        onSuccess: () => {
            if(window?.location){
                window.location.reload()
            }
        }
    })
    if (!isSuccess) return;


    return (
        <Menu
            sx={{
                minWidth: 156
            }}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => setAnchorEl(null)}
        >
            <MenuList sx={{ minWidth: "100%" }}>
                {menuProfileList.map(el => (
                    <Link href={`/${locale}/user/${data.id}/${el.href}`} key={el.title}>
                        <MenuItem
                            onClick={() => setAnchorEl(null)}
                            sx={{
                                //    maxWidth: '100%'
                            }}>
                            {el.title}
                        </MenuItem>
                    </Link>
                ))}
                <MenuItem onClick={() => mutate()}>
                {t("button.logout")}
                </MenuItem>
            </MenuList>

        </Menu>
    )
}

export default ProfileMenu
