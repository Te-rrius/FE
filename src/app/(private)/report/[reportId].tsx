import ScreenContainer from '@/components/layout/ScreenContainer';
import ReportScreen from '@/screens/accout/report/ReportScreen';

import { useLocalSearchParams } from 'expo-router';

const Report = () => {
  const { reportId } = useLocalSearchParams();

  return (
    <ScreenContainer>
      <ReportScreen reportId={reportId} />
    </ScreenContainer>
  );
};

export default Report;
