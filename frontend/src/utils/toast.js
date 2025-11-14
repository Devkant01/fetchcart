import { toast } from 'react-toastify';

// Small wrapper helpers for consistent toast usage across the app
export const toastSuccess = (message = 'Success') =>
    toast.success(message, { position: 'top-right' });

export const toastError = (message = 'Something went wrong') =>
    toast.error(message, { position: 'top-right' });

export const toastInfo = (message) =>
    toast.info(message, { position: 'top-right' });

export const toastWarn = (message) =>
    toast.warn(message, { position: 'top-right' });

export default toast;
