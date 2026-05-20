import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/apis/account/user';
import { queryKeys } from '@/services/queryKeys';

export const useUserQuery = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: getUser,
    select: (res) => res.data,
  });
};
