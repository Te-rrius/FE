import ScreenContainer from '@/components/layout/ScreenContainer';
import ReportScreen from '@/screens/accout/report/ReportScreen';

import { useLocalSearchParams } from 'expo-router';

const Report = () => {
  const { matchVideoId } = useLocalSearchParams();

  return (
    <ScreenContainer>
      <ReportScreen matchVideoId={matchVideoId} />
    </ScreenContainer>
  );
};

export default Report;
