export type geckoList = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
};

export type CoinData = {
  id: string;
  symbol: string;
  name: string;
  genesis_date: string;
  image: string;
  block_time_in_minutes: number;
  current_price: number;
  market_data: MarketCap;
  market_cap_rank: number;
};

type MarketCap = {
  current_price: { [key: string]: number };
  ath: { [key: string]: number };
  ath_change_percentage: { [key: string]: number };
  ath_date: { [key: string]: number };
  atl: { [key: string]: number };
  atl_change_percentage: { [key: string]: number };
  atl_date: { [key: string]: number };
  market_cap: { [key: string]: number };
  market_cap_rank: number;
  high_24h: { [key: string]: number };
  low_24h: { [key: string]: number };

  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_1y: number;
};
