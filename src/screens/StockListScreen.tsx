import React, {useMemo} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import Ticker from '../api/Responses/Ticker';
import StockItem from '../components/StockItem';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const StockListScreen = ({
  stocks,
  onLoadMore,
  onPressItem,
}: {
  stocks: Ticker[];
  onPressItem: () => void;
  onLoadMore: () => void;
}) => {
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="white"
        />
      </View>
    );
  };

  const keyExtractor = useMemo(() => {
    return (item: string, index: number) => `${item.ticker}_${index}`;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        testID="stock-list"
        data={stocks}
        renderItem={({item}) => (
          <StockItem onPressBtn={onPressItem} {...item} />
        )}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NAVY_HIGH,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default StockListScreen;
