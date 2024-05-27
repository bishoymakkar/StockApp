import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {act} from '@testing-library/react-native';
import BootSplash from 'react-native-bootsplash';

import MyApis from './src/api/MyApis';
import Colors from './src/themes/colors';
import Header from './src/components/Header';
import Ticker from './src/api/Responses/Ticker';
import SearchBar from './src/components/SearchBar';
import StockListScreen from './src/screens/StockListScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState<Ticker[]>([]);
  const [searchStockData, setSearchStockData] = useState<Ticker[]>([]);
  const [searchText, setSearchText] = useState('');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const myApis = useMemo(() => new MyApis('https://api.polygon.io/v3'), []);

  const fetchData = useCallback(
    async (cursor: string | null) => {
      let isMounted = true;
      try {
        const data = await myApis.fetchStockData(cursor);
        if (isMounted && data) {
          await act(async () => {
            setStockData(prevData => [...prevData, ...data.tickers]);
            setNextCursor(data.nextCursor);
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        if (isMounted) {
          await BootSplash.hide({fade: true});
        }
      }
      return () => {
        isMounted = false;
      };
    },
    [myApis],
  );

  useEffect(() => {
    fetchData(null);
  }, [fetchData]);

  const fetchSearchData = async (cursor: string | null) => {
    setIsLoading(true);
    const data = await myApis.fetchSearchStockData(searchText, cursor);
    if (data) {
      setSearchStockData(prevData => [...prevData, ...data.tickers]);
      setNextCursor(data.nextCursor);
    }
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    if (nextCursor) {
      fetchData(nextCursor);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setSearchStockData([]);
    setNextCursor(null);
    if (text.length > 2) {
      fetchSearchData(null);
    }
  };

  const handlePressItem = (ticker: string, name: string) => {
    Alert.alert('Stock Item Pressed', `Ticker: ${ticker}, Name: ${name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.NAVY_HIGHEST}
      />
      <Header />
      <View style={styles.content}>
        <SearchBar onSearch={handleSearch} />
        {isLoading && (stockData.length === 0 || searchText.length === 0) ? (
          <View style={styles.activityContainer}>
            <ActivityIndicator
              testID="loading-indicator"
              size="large"
              color="white"
            />
          </View>
        ) : (
          <StockListScreen
            onPressItem={handlePressItem}
            stocks={searchText.length > 0 ? searchStockData : stockData}
            onLoadMore={handleLoadMore}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NAVY_HIGH,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
