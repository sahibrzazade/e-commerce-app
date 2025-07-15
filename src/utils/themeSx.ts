export const getTextSx = (theme: 'light' | 'dark') => ({
  color: theme === 'light' ? 'black' : 'white',
});

export const getBackgroundSx = (theme: 'light' | 'dark') => ({
  backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
}); 