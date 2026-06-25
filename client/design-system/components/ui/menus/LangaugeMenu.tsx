
import { languages } from '@/constants/lists/language'
import { MenuPropsType } from './ProfileMenu'
import { FormControlLabel, Menu, Radio, RadioGroup } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

function LangaugeMenu({ anchorEl, isOpen, setAnchorEl }: MenuPropsType) {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();


    const setLanguage = (language: string) => {
        document.cookie = `locale=${language}; path=/; max-age=31536000`;

        const pathWithoutLocale = pathname.replace(
            `/${locale}`,
            ""
        );

        router.push(`/${language}${pathWithoutLocale}`,);
    };
    return (
        <Menu
            sx={{
                minWidth: 166
            }}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => setAnchorEl(null)}

        >
            <RadioGroup
                sx={{ padding: 1 }}
                onChange={(e) => setLanguage(e.target.value)}>
                {languages.map(el => (
                    <FormControlLabel
                        key={el.name}
                        checked={locale == el.code}
                        value={el.code}
                        control={<Radio />}
                        label={el.name}
                    />
                ))}
            </RadioGroup>
        </Menu>
    )
}

export default LangaugeMenu
