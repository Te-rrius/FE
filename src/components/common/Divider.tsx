import { StyleSheet, View } from 'react-native';

const Divider = () => {
  return <View style={styles.container} />;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
  },
});
