import { apiClient } from './client';
import {
  ApiResponse,
  Quest,
  QuestCreateRequest,
  QuestCompletionResult,
  QuestType,
} from '../types';

export const questApi = {
  list: (type?: QuestType) =>
    apiClient.get<ApiResponse<Quest[]>>('/quests', { params: { type } }),

  get: (id: number) => apiClient.get<ApiResponse<Quest>>(`/quests/${id}`),

  create: (data: QuestCreateRequest) =>
    apiClient.post<ApiResponse<Quest>>('/quests', data),

  accept: (id: number) =>
    apiClient.post<ApiResponse<null>>(`/quests/${id}/accept`),

  complete: (id: number) =>
    apiClient.post<ApiResponse<QuestCompletionResult>>(`/quests/${id}/complete`),

  abandon: (id: number) =>
    apiClient.delete<ApiResponse<null>>(`/quests/${id}/abandon`),
};
