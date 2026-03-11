// import { wp, hp } from '@/utils/dimension'; 하여 사용

import { Dimensions } from "react-native";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const wp = (px: number) => {
  const width = Dimensions.get("window").width;
  return (px / BASE_WIDTH) * width;
};

export const hp = (px: number) => {
  const height = Dimensions.get("window").height;
  return (px / BASE_HEIGHT) * height;
};
