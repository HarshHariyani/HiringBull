import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from './api';
// import { userKeys } from './keys'; // Uncomment when using invalidateQueries

export const useRegisterDevice = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.registerDevice,
    meta: {
      // successMessage: 'Device registered successfully', // Uncomment if you want a toast
      // toastError: true
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: userKeys.devices() });
    },
  });
};
