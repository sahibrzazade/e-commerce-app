import { themedBackground, themedBorder, themedText } from "../styles/themeClassNames";
import { OutlinedButtonProps } from "../types";

export const OutlinedButton = ({ content, height, width, fontWeight, onClick, isDisabled, type }: OutlinedButtonProps) => {

  const hoverStyle = isDisabled ? '' : 'hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black ';

  return (
    <button
      onClick={onClick}
      className={`${themedBorder} ${themedBackground} ${themedText} ${hoverStyle} flex items-center justify-center text-base border cursor-pointer transition duration-300 
        ${fontWeight === 'bold' ? 'font-bold' : fontWeight === 'normal' ? 'font-normal' : 'font-thin'}`}
      style={{ height: height, width: width }}
      disabled={isDisabled}
      type={type}
    >
      {content}
    </button>
  );
};
