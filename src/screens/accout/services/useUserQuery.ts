import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/apis/account/user';
import { queryKeys } from '@/services/queryKeys';
import useAuthStore from '@/stores/authStore';

export const useUserQuery = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.user,
    queryFn: getUser,
    select: (res) => res.data,
    enabled: !!token,
  });
};
