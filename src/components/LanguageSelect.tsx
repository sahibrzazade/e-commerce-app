import { Select, MenuItem, FormControl } from '@mui/material';
import { LanguageSelectProps, LanguageOption } from '../types';
import { languageMenuProps, languageSelectSx } from '../styles/languageSelect';

const languages: LanguageOption[] = [
    { code: 'az', name: 'AZ', flag: '🇦🇿' },
    { code: 'tr', name: 'TR', flag: '🇹🇷' },
    { code: 'en', name: 'EN', flag: '🇬🇧' }
];

export const LanguageSelect = ({ value, onChange, disabled = false, showName = true }: LanguageSelectProps) => {
    return (
        <FormControl>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                sx={languageSelectSx}
                MenuProps={languageMenuProps}
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