import { toast } from 'react-toastify';

const defaultSuccessMessage = 'Operation successful!';
const defaultErrorMessage = 'Something went wrong!';

export const showSuccessMessage = (message?: string) => {
    toast.success(message || defaultSuccessMessage, {
        autoClose: 3000,
    });
};

export const showErrorMessage = (message?: string) => {
    toast.error(message || defaultErrorMessage, {
        autoClose: 5000,
    });
};
