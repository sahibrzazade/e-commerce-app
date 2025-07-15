export const getLanguageSelectSx = (theme: "light" | "dark") => ({
  backgroundColor: theme === "light" ? "white" : "black",
  border: `1px solid ${theme === "light" ? "black" : "white"}`,
  color: theme === "light" ? "black" : "white",
  height: "40px",
  borderRadius: "0",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: theme === "light" ? "black" : "white",
  },
  "& .MuiSelect-select": {
    color: theme === "light" ? "black" : "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

export const getLanguageMenuProps = (theme: "light" | "dark") => ({
  PaperProps: {
    sx: {
      backgroundColor: theme === "light" ? "white" : "black",
      border: `1px solid ${theme === "light" ? "black" : "white"}`,
      borderRadius: "0",
      "& .MuiMenuItem-root": {
        color: theme === "light" ? "black" : "white",
        "&:hover": {
          backgroundColor: theme === "light" ? "#eee" : "#333",
        },
        "&.Mui-selected": {
          backgroundColor: theme === "light" ? "#ccc" : "#555",
          "&:hover": {
            backgroundColor: theme === "light" ? "#ccc" : "#555",
          },
        },
      },
    },
  },
});