import { CourtDto } from '@/constants/dummyCourt';
import { hp, wp } from '@/utils/dimension';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface CourtListProps {
  courtList: CourtDto[];
  searchValue: string;
  selectedCity: string;
  selectedRegion: string;
}

const CourtList = ({ courtList, searchValue, selectedCity, selectedRegion }: CourtListProps) => {
  const getDisplayLocation = (location: string) => {
    if (location.startsWith('서울시') || location.startsWith('인천광역시')) {
      return { city: location.split(' ')[0], region: location.split(' ')[1] };
    }
    return { city: location.split(' ')[1], region: location.split(' ')[2] };
  };

  const getFilterLocation = (location: string) => ({
    filterCity: location.split(' ')[0],
    filterRegion: location.split(' ')[1],
  });

  const filteredList = courtList.filter((court) => {
    const { filterCity, filterRegion } = getFilterLocation(court.location);

    const matchName = searchValue ? court.name.includes(searchValue) : true;
    const matchCity = selectedCity !== '도시' ? filterCity === selectedCity : true;
    const matchRegion = selectedRegion !== '지역' ? filterRegion === selectedRegion : true;

    return matchName && matchCity && matchRegion;
  });

  if (filteredList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyText}>
          {searchValue ? <Text style={styles.searchedName}>"{searchValue}"</Text> : null}
          <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
        </View>
        <Text style={styles.hintText}>다른 검색어를 입력해 보세요.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listGridContainer}>
      {filteredList.map((court) => {
        const { city, region } = getDisplayLocation(court.location);

        return (
          <View key={String(court.courtId)} style={styles.cardWrapper}>
            <Pressable style={styles.cardContainer}>
              <Image source={{ uri: court.image }} style={styles.courtImg} resizeMode="cover" />
              <LinearGradient colors={['transparent', 'rgba(17, 17, 17, 0.80)']} style={styles.imgCover} />
              <View style={styles.infoContainer}>
                <View style={styles.badgeRow}>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{city}</Text>
                  </View>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{region}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.courtNameText}>{court.name}</Text>
                  <Text style={styles.courtLocationText}>{court.location}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        );
      })}
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

  courtImg: {
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
    lineHeight: 10,
  },

  courtNameText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard600',
    fontSize: wp(14),
    lineHeight: 20,
    letterSpacing: -0.35,
  },

  courtLocationText: {
    color: '#CACACA',
    fontSize: wp(8),
    fontFamily: 'Pretendard400',
    lineHeight: 12,
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
    lineHeight: 24,
  },

  noResultText: {
    color: '#303030',
    fontSize: wp(16),
    fontFamily: 'Pretendard400',
    lineHeight: 24,
  },

  hintText: {
    color: '#767676',
    fontSize: wp(14),
    fontFamily: 'Pretendard400',
    lineHeight: 20,
  },
});

export default CourtList;
