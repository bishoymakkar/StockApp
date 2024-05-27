import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Colors from '../themes/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        testID="header"
        source={require('../assets/headerLogo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.NAVY_HIGHEST,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  logo: {
    width: 135,
    height: 36,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Header;
