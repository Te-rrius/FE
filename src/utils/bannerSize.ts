import { useWindowDimensions } from 'react-native';

const useBannerSize = (originalWidth: number, originalHeight: number) => {
  const { width } = useWindowDimensions();
  return {
    width,
    height: (width * originalHeight) / originalWidth,
  };
};

export default useBannerSize;
