import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { questApi } from '../api/quest';
import { QuestType } from '../types';

export function useQuestList(type?: QuestType) {
  return useQuery({
    queryKey: ['quests', type ?? 'ALL'],
    queryFn: () => questApi.list(type).then((res) => res.data.data ?? []),
  });
}

export function useQuestActions() {
  const queryClient = useQueryClient();

  const accept = useMutation({
    mutationFn: questApi.accept,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quests'] }),
  });

  const complete = useMutation({
    mutationFn: questApi.complete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { accept, complete };
}
