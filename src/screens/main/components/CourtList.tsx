import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { hp, wp } from '@/utils/dimension';
import { StadiumResponse } from '@/types/stadium/stadium';

interface StadiumListProps {
  stadiumList: StadiumResponse[];
}

const StadiumList = ({ stadiumList }: StadiumListProps) => {
  if (stadiumList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyText}>
          <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
        </View>
        <Text style={styles.hintText}>다른 검색어를 입력해 보세요.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listGridContainer}>
      {stadiumList.map((stadium) => (
        <View key={stadium.stadiumId} style={styles.cardWrapper}>
          <Pressable
            style={styles.cardContainer}
            onPress={() =>
              router.push({
                pathname: '/stadium/[stadiumId]',
                params: {
                  stadiumId: stadium.stadiumId,
                  name: stadium.name,
                  imageUrl: stadium.imageUrl,
                  address: stadium.address,
                },
              })
            }
          >
            <Image source={{ uri: stadium.imageUrl }} style={styles.stadiumImg} resizeMode="cover" />
            <LinearGradient colors={['transparent', 'rgba(17, 17, 17, 0.80)']} style={styles.imgCover} />
            <View style={styles.infoContainer}>
              <View style={styles.badgeRow}>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{stadium.province}</Text>
                </View>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{stadium.city}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.stadiumNameText}>{stadium.name}</Text>
                <Text style={styles.stadiumLocationText}>{stadium.address}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(4),
  },

  cardWrapper: {
    width: '49%',
  },

  cardContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    position: 'relative',
  },

  stadiumImg: {
    width: '100%',
    height: '100%',
  },

  imgCover: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '66.66%',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  infoContainer: {
    position: 'absolute',
    bottom: hp(12),
    left: wp(12),
    right: wp(12),
    gap: hp(4),
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },

  badgeContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    textAlign: 'center',
    backgroundColor: '#4048F7',
    borderRadius: 2,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: wp(8),
    fontFamily: 'Pretendard700',
    lineHeight: hp(10),
  },

  stadiumNameText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: hp(20),
    letterSpacing: -0.5,
  },

  stadiumLocationText: {
    color: '#CACACA',
    fontSize: wp(8),
    fontFamily: 'Pretendard400',
    lineHeight: hp(12),
    letterSpacing: -0.5,
  },

  emptyContainer: {
    marginTop: hp(64),
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(12),
  },

  emptyText: {
    alignItems: 'center',
    gap: hp(4),
  },

  searchedName: {
    color: '#4048F7',
    fontSize: wp(16),
    fontFamily: 'Pretendard600',
    lineHeight: hp(24),
  },

  noResultText: {
    color: '#303030',
    fontSize: wp(16),
    fontFamily: 'Pretendard400',
    lineHeight: hp(24),
  },

  hintText: {
    color: '#767676',
    fontSize: wp(14),
    fontFamily: 'Pretendard400',
    lineHeight: hp(20),
  },
});

export default StadiumList;
