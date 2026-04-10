import PageHeader from '@/components/layout/PageHeader';
import { StyleSheet, Text, View } from 'react-native';

import ReportDownloadIcon from '@/assets/images/report/reportDownloadIcon.svg';
import { hp, wp } from '@/utils/dimension';

type ReportScreenProps = {
  reportId: string | string[];
};

const ReportScreen = ({ reportId }: ReportScreenProps) => {
  return (
    <>
      <PageHeader
        rightContent={
          <View style={styles.headerDownContainer}>
            <Text style={styles.headerDownText}>리포트 다운</Text>
            <ReportDownloadIcon />
          </View>
        }
      />
    </>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  headerDownContainer: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },

  headerDownText: {
    color: '#999999',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: wp(-0.3),
  },
});
