export const OutlinedButton = ({ text }: { text: string }) => {
  return (
    <button className="w-[200px] h-[60px] bg-black text-white text-base font-bold border border-white cursor-pointer p-4 transition duration-300 hover:bg-white hover:text-black">
      {text}
    </button>
  );
};
