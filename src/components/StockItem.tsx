import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Colors from '../themes/colors';

type StockItemProps = {
  ticker: string;
  name: string;
  onPressBtn: (ticker: string, name: string) => void;
};

const screenWidth = Dimensions.get('screen').width;
const StockItem: React.FC<StockItemProps> = ({ticker, name, onPressBtn}) => {
  const handlePress = () => {
    onPressBtn(ticker, name);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}>
      <Text style={styles.ticker}>{ticker}</Text>
      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 14,
    margin: 8,
    backgroundColor: Colors.NAVY_MID,
    borderRadius: 10,
    width: screenWidth / 2 - 24,
    height: 100,
  },
  ticker: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    color: 'gray',
    fontSize: 12,
  },
});

export default StockItem;
