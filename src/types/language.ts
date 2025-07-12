export interface LanguageSelectProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    height?: string;
    showName?: boolean;
}

export type Language = "az" | "en" | "tr";

export interface LanguageOption {
    code: Language;
    name: string;
    flag: string;
} 