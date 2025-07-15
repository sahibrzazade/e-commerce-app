import { Select, MenuItem, FormControl } from '@mui/material';
import { LanguageSelectProps } from '../types';
import { getLanguageMenuProps, getLanguageSelectSx } from '../styles/languageSelect';
import { useTheme } from '../contexts/themeContext';
import { languages } from '../constants/languageOptions';



export const LanguageSelect = ({ value, onChange, disabled = false, showName = true }: LanguageSelectProps) => {

    const { theme } = useTheme();

    return (
        <FormControl>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                sx={getLanguageSelectSx(theme)}
                MenuProps={getLanguageMenuProps(theme)}
            >
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        value={lang.code}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {lang.flag} {showName && lang.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}; 