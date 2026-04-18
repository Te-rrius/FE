import ScreenContainer from '@/components/layout/ScreenContainer';
import StadiumDetailScreen from '@/screens/replay/StadiumDetailScreen';

import { useLocalSearchParams } from 'expo-router';

const Detail = () => {
  const { stadiumId } = useLocalSearchParams();

  return (
    <ScreenContainer>
      <StadiumDetailScreen stadiumId={stadiumId} />
    </ScreenContainer>
  );
};

export default Detail;
