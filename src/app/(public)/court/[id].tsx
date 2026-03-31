import ScreenContainer from '@/components/layout/ScreenContainer';
import CourtDetailScreen from '@/screens/replay/CourtDetailScreen';

import { useLocalSearchParams } from 'expo-router';

const Detail = () => {
  const { courtId } = useLocalSearchParams();

  return (
    <ScreenContainer>
      <CourtDetailScreen courtId={courtId} />
    </ScreenContainer>
  );
};

export default Detail;
