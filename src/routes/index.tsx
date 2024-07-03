import { cache, createAsync } from "@solidjs/router";
import { createSignal } from "solid-js";
import CoinTable from "~/components/cointable";
import { TextField, TextFieldInput } from "~/components/ui/text-field";

import { geckoList } from "~/lib/types";

const geckoData = cache(async () => {
  "use server";
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en"
  );
  return (await response.json()) as geckoList[];
}, "data");

export const route = {
  load: () => geckoData(),
};

export default function Home() {
  const ping = createAsync(() => geckoData());
  const [search, setSearch] = createSignal("");

  return (
    <main class="flex flex-col mx-auto text-gray-700 p-4">
      <div class="flex justify-between items-center mx-8">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
          CryptoWatcher
        </h1>
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldInput type="text" placeholder="Search" />
        </TextField>
      </div>
      <div class="container mx-auto">
        <CoinTable data={ping()} />
      </div>
    </main>
  );
}
