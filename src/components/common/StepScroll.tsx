import React, { useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { hp, wp } from '@/utils/dimension';
import { SvgProps } from 'react-native-svg';

type ImageItem = ImageSourcePropType;
type SvgItem = React.ComponentType<SvgProps>;

type StepScrollProps = {
  images: (ImageItem | SvgItem)[];
};

const StepScroll = ({ images }: StepScrollProps) => {
  const { width: screenWidth } = useWindowDimensions();

  const total = images.length;
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (wp(330) + wp(12)));
    setCurrentIndex(Math.min(Math.max(index, 0), total - 1));
  };

  const onDotPress = (index: number) => {
    scrollRef.current?.scrollTo({ x: (wp(330) + wp(12)) * index, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={wp(330) + wp(12)}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        contentContainerStyle={{ paddingHorizontal: (screenWidth - wp(330)) / 2 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((item, index) => (
          <View key={index} style={[styles.slide, index < total - 1 && { marginRight: wp(12) }]}>
            {typeof item === 'function' ? (
              (() => {
                const Svg = item;
                return <Svg width={wp(330)} height={hp(300)} />;
              })()
            ) : (
              <Image source={item} style={styles.stepImg} resizeMode="contain" />
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {Array.from({ length: total }).map((_, index) => (
          <TouchableOpacity key={index} onPress={() => onDotPress(index)} hitSlop={8}>
            <View style={[styles.dot, index === currentIndex ? styles.dotActive : styles.dotInactive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    paddingTop: hp(24),
    paddingBottom: hp(20),
    gap: wp(16),
  },

  slide: {
    width: wp(330),
    height: hp(300),
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepImg: {
    width: wp(330),
    height: hp(300),
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(8),
  },

  dot: {
    height: hp(6),
    borderRadius: 100,
  },

  dotActive: {
    width: wp(20),
    backgroundColor: '#111111',
  },

  dotInactive: {
    width: wp(6),
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },
});

export default StepScroll;
