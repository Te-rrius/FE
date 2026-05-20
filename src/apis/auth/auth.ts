import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export const openKakaoLogin = async (): Promise<string | null> => {
  const loginUrl = `${process.env.EXPO_PUBLIC_SERVER_URL?.replace(/\/$/, '')}/oauth2/authorization/kakao`;

  const result = await WebBrowser.openAuthSessionAsync(loginUrl, 'terrius://oauth/callback');

  if (result.type !== 'success') return null;

  const parsed = Linking.parse(result.url);
  const accessToken = parsed.queryParams?.accessToken;

  if (typeof accessToken !== 'string') return null;

  return accessToken;
};
