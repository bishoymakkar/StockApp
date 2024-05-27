import Ticker from './Responses/Ticker';

class MyApis {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchStockData(
    cursor: string | null,
  ): Promise<{tickers: Ticker[]; nextCursor: string | null} | null> {
    return this.fetchData(cursor, '');
  }

  async fetchSearchStockData(
    searchText: string,
    cursor: string | null,
  ): Promise<{tickers: Ticker[]; nextCursor: string | null} | null> {
    return this.fetchData(cursor, searchText);
  }

  private async fetchData(
    cursor: string | null,
    searchText: string,
  ): Promise<{tickers: Ticker[]; nextCursor: string | null} | null> {
    try {
      let url = `${this.baseUrl}/reference/tickers?active=true&limit=10`;
      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`;
      }
      if (searchText) {
        url += `&search=${encodeURIComponent(searchText)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer Qr2YexjYsJO_WMBuy7AmrsK8UfF3doJa',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 'OK' && data.results) {
        let nextCursor: string | null = null;
        if (data.next_url) {
          const urlParams = data.next_url.split('?')[1];
          const params = urlParams.split('&');
          for (const param of params) {
            const [key, value] = param.split('=');
            if (key === 'cursor') {
              nextCursor = decodeURIComponent(value);
              break;
            }
          }
        }
        return {
          tickers: data.results as Ticker[],
          nextCursor: nextCursor,
        };
      } else {
        console.error('API response error:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
}

export default MyApis;
