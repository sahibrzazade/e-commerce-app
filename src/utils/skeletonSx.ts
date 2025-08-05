export const getSkeletonSx = (theme: "dark" | "light") => ({
    bgcolor: theme === 'dark' ? '#222' : '#e0e0e0',
    color: theme === 'dark' ? '#444' : '#888',
});
