import { client } from '@/api/common/client';
import type { DeviceRegistration, DeviceResponse } from './types';

export const userApi = {
  registerDevice: async (data: DeviceRegistration) => {
    const res = await client.post<DeviceResponse>('/api/users/devices', data);
    return res.data;
  },
};
