import { cache, createAsync, useParams } from "@solidjs/router";
import { CoinData } from "~/lib/types";

const routeData = cache(async () => {
  // "use server";
  const params = useParams();
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );

  if (!response.ok) {
    if (response.status === 429) {
      console.log("Rate limit hit.");
    } else {
      console.log(`Error: ${response.status} ${response.statusText}`);
    }
    return null;
  }

  const data = await response.json();
  return data as CoinData;
}, "coin");

export const route = {
  load: () => routeData(),
};

export default function CoinId() {
  const coin = createAsync(() => routeData());
  return (
    <div class="flex justify-center items-center h-svh">
      <h1>Hello</h1>
      <h1>{coin()?.name}</h1>
    </div>
  );
}
