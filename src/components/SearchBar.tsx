import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Colors from '../themes/colors';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar = ({onSearch}: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for stocks..."
        placeholderTextColor={Colors.GRAY_HIGHEST}
        value={searchText}
        onChangeText={handleSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
  searchBar: {
    padding: 10,
    backgroundColor: Colors.NAVY_MID,
    borderRadius: 25,
    fontSize: 16,
    color: Colors.GRAY_HIGHEST,
    borderWidth: 1,
    borderColor: Colors.GRAY_HIGHEST,
  },
});

export default SearchBar;
