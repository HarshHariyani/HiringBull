export interface DeviceRegistration {
  token: string;
  type: 'ios' | 'android';
}

export interface DeviceResponse {
  message: string;
  // Add other fields returned by the backend as needed
}
