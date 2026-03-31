import { hp, wp } from '@/utils/dimension';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TabProps {
  tabs: {
    title: string;
    handler: () => void;
  }[];
  activeTab: string;
}

const Tab = ({ tabs, activeTab }: TabProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.title}
            onPress={tab.handler}
            style={[styles.inner, activeTab === tab.title && styles.active]}
          >
            <Text style={[styles.tabText, activeTab === tab.title && styles.activeText]}>{tab.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
  },

  wrapper: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: wp(6),
    paddingVertical: hp(6),
    flexDirection: 'row',
    borderRadius: 8,
  },

  inner: {
    flex: 1,
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  active: {
    backgroundColor: '#4048F7',
  },

  tabText: {
    color: '#767676',
    fontFamily: 'Pretendard600',
    fontSize: wp(16),
    lineHeight: hp(24),
    letterSpacing: wp(-0.4),
  },

  activeText: {
    color: '#FFFFFF',
  },
});
