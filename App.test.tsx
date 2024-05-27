import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from './App';

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn(),
    show: jest.fn(),
  };
});

jest.mock('./src/api/MyApis', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    fetchStockData: jest.fn(() =>
      Promise.resolve({
        tickers: [{ticker: 'AAPL', name: 'Apple Inc.'}],
        nextCursor: null,
      }),
    ),
    fetchSearchStockData: jest.fn(() =>
      Promise.resolve({
        tickers: [{ticker: 'AAPL', name: 'Apple Inc.'}],
        nextCursor: null,
      }),
    ),
  })),
}));

describe('<App />', () => {
  it('renders header correctly', () => {
    const {getByTestId} = render(<App />);
    const header = getByTestId('header');
    expect(header).toBeTruthy();
  });

  it('renders search bar correctly', () => {
    const {getByPlaceholderText} = render(<App />);
    const searchBar = getByPlaceholderText('Search for stocks...');
    expect(searchBar).toBeTruthy();
  });

  it('populates stock list with data after fetching', async () => {
    const {getByTestId} = render(<App />);
    await waitFor(() => {
      const stockList = getByTestId('stock-list');
      expect(stockList.children.length).toBeGreaterThan(0);
    });
  });

  it('displays loading indicator while fetching data', async () => {
    const {getByTestId} = render(<App />);
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });
});
