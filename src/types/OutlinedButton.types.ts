import { ReactNode } from "react";

type FontWeight = "bold" | "normal" | "thin"

export interface OutlinedButtonProps {
    content: string | ReactNode;
    height: number;
    width: number;
    fontWeight: FontWeight;
    onClick?: () => void;
    disabled?: boolean;
}