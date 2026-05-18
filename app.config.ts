export default {
  expo: {
    name: "Terrius",
    slug: "terrius",
    scheme: "terrius",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",

    splash: {
      image: "./src/assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.terrius.app",
    },

    android: {
      package: "com.terrius.app",
      predictiveBackGestureEnabled: false,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./src/assets/android-icon-foreground.png",
        backgroundImage: "./src/assets/android-icon-background.png",
        monochromeImage: "./src/assets/android-icon-monochrome.png",
      },
    },

    web: {
      favicon: "./src/assets/favicon.png",
    },

    plugins: [
      "expo-router",
      "expo-font",

      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: [
              "https://devrepo.kakao.com/nexus/content/groups/public/",
            ],
          },
        },
      ],

      [
        "@react-native-kakao/core",
        {
          nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
          android: {
            authCodeHandlerActivity: true,
          },
          ios: {
            handleKakaoOpenUrl: true,
          },
        },
      ],
    ],
  },
};
