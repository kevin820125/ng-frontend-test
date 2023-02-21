import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Quest from '@/interfaces/Quest';

const fetchQuests = async () => {
  const { data } = await axios.get('/api/quests');
  return data;
};

export const useQuests = () => {
  return useQuery<Quest[], Error>(['quests'], fetchQuests);
};

const fetchQuest = async (id: string | undefined) => {
  if (typeof id === 'undefined') return {};

  const { data } = await axios.get(`/api/quests/${id}`);
  return data;
};

export const useQuest = (id: string | undefined) => {
  return useQuery<Quest, Error>(['quest'], () => fetchQuest(id));
};
