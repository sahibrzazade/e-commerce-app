import { Select, MenuItem, FormControl } from '@mui/material';
import { LanguageSelectProps, LanguageOption } from '../types';

const languages: LanguageOption[] = [
    { code: 'az', name: 'AZ', flag: '🇦🇿' },
    { code: 'tr', name: 'TR', flag: '🇹🇷' },
    { code: 'en', name: 'EN', flag: '🇬🇧' }
];

export const LanguageSelect = ({ value, onChange, disabled = false, height = '40px', showName = true }: LanguageSelectProps) => {
    return (
        <FormControl>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                sx={{
                    backgroundColor: 'black',
                    border: '1px solid white',
                    color: 'white',
                    height: height,
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiSelect-icon': {
                        color: 'white',
                    },
                    '& .MuiSelect-select': {
                        color: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: 'black',
                            border: '1px solid white',
                            '& .MuiMenuItem-root': {
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#333',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#555',
                                    '&:hover': {
                                        backgroundColor: '#555',
                                    },
                                },
                            },
                        },
                    },
                }}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                        {lang.flag} {showName && lang.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}; 