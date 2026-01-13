import { apiClient } from './client';
import { ApiResponse, AuthResponse, LoginRequest, SignupRequest } from '../types';

export const authApi = {
  signup: (data: SignupRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data),

  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),

  refresh: (refreshToken: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', { refreshToken }),
};
