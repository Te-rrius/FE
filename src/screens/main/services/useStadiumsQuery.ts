import { useQuery } from '@tanstack/react-query';
import { getStadiums } from '@/apis/stadium/stadium';
import { queryKeys } from '@/services/queryKeys';
import type { StadiumQueryParams } from '@/types/stadium/stadium';

export const useStadiumsQuery = (params?: StadiumQueryParams) => {
  return useQuery({
    queryKey: queryKeys.stadiums(params),
    queryFn: () => getStadiums(params),
    select: (res) => res.data,
  });
};
