export const sortSelectSx = {
    backgroundColor: 'black',
    border: '1px solid white',
    color: 'white',
    height: '40px',
    minWidth: '180px',
    borderRadius: '0',
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
};

export const sortMenuProps = {
    PaperProps: {
        sx: {
            backgroundColor: 'black',
            border: '1px solid white',
            borderRadius: '0',
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
};