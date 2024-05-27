# React Native Stock Market App

Welcome to the React Native Stock Market App task! This project aims to create a mobile application that displays stock market data.

### Splash Screen

- Display Nasdaq logo centered on the screen.

### Explore Screen

- Display stocks listed in Nasdaq exchange with their ticker and full name.
- Implement infinite scrolling to load more stocks.
- Implement search functionality to search for specific stocks using backend search.

## API Integration

Integrated with the Polygon.io Stocks API. It's important to note that the API has rate limiting, and if too many requests are made within a short period, it will fail. The application should handle this by implementing a retry mechanism with a delay of one minute between retries.

## Expectations

- Utilize TypeScript for type safety.
- Implement unit tests for all components and logic.
- Use a state management solution for managing application state.
- Handle errors gracefully, including API rate limiting.
- Follow best practices for React Native development, including component structure and organization.

## Technologies Used

- React Native
- TypeScript
- State Management
- Jest and React Testing Library for testing
