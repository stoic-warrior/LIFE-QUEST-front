import { apiClient } from './client';
import { ApiResponse, User, UserStats } from '../types';

export const userApi = {
  getMe: () => apiClient.get<ApiResponse<User>>('/users/me'),

  getMyStats: () => apiClient.get<ApiResponse<UserStats>>('/users/me/stats'),
};
