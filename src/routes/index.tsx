import { For, Show, createResource, createSignal } from "solid-js";
import { useRouteData } from "solid-start";

type geckoList = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
};

export function routeData() {
  const [ping] = createResource(async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en"
    );
    return (await response.json()) as geckoList[];
  });

  return { ping };
}

export default function Home() {
  const { ping } = useRouteData<typeof routeData>();
  const [search, setSearch] = createSignal("");

  return (
    <main class=" mx-auto text-gray-700 p-4">
      <div class="flex justify-between items-center">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
          CryptoWatcher
        </h1>

        <input type="text" placeholder="Search" value={search()} class="border-neutal-50 text-justify border-solid border-2 w-96 h-16 rounded-md" />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Price Change</th>
          </tr>
        </thead>
        <tbody>
          <For each={ping()}>
            {(ping) => (
              <tr class="hover">
                <td>{ping.market_cap_rank}</td>
                <td>
                  <span class="inline">
                    <img src={`${ping.image}`} alt="symbol" width={20} />
                  </span>
                  {ping.name}
                  <span class="ml-2 font-light">{ping.id}</span>
                </td>
                <td>{ping.current_price}</td>
                <td>{ping.market_cap}</td>
                <td>
                  <Show when={ping.price_change_percentage_24h > 0} fallback={<p class="text-red-400">{ping.price_change_percentage_24h}</p>}>
                    <p class="text-green-400">{ping.price_change_percentage_24h}</p>
                  </Show>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </main>
  );
}
