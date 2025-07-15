export const getFilterOffcanvasSliderSx = (theme: "light" | "dark") => ({
    '& .MuiSlider-thumb': {
        backgroundColor: theme === "light" ? 'black' : "white",
    },
    '& .MuiSlider-track': {
        backgroundColor: theme === "light" ? 'black' : "white",
    },
    '& .MuiSlider-rail': {
        backgroundColor: theme === "light" ? '#e5e7eb' : "#374151",
    },
    '& .MuiSlider-valueLabel': {
        backgroundColor: theme === "light" ? 'black' : "white",
    },
})  