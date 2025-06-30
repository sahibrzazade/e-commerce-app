import { OutlinedButtonProps } from "../types";

export const OutlinedButton = ({ content, height, width, fontWeight, onClick }: OutlinedButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black flex items-center justify-center text-white text-base border border-white cursor-pointer transition duration-300 hover:bg-white hover:text-black 
        ${fontWeight === 'bold' ? 'font-bold' : fontWeight === 'normal' ? 'font-normal' : 'font-thin'}`}
      style={{ height: height, width: width }}
    >
      {content}
    </button>
  );
};
