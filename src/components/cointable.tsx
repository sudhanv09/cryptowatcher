import { geckoList } from "~/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { BadgeDelta } from "~/components/ui/badge-delta";
import { For, Show } from "solid-js";
import { A } from "@solidjs/router";

export default function CoinTable({ data }: { data: geckoList[] | undefined }) {
  if (data === undefined) return <h1>Data unavailable</h1>;
  return (
    <Table>
      <TableCaption>Top Coins by Market Cap</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Coin</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead>Price Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={data}>
          {(data) => (
            <TableRow>
              <TableCell>{data.market_cap_rank}</TableCell>
              <TableCell class="flex flex-col">
                <A href={`coin/${data.symbol}`} class="flex items-center">
                  <span class="mr-4">
                    <img src={`${data.image}`} alt="symbol" width={25} />
                  </span>
                  <h1 class="text-2xl font-bold">{data.name}</h1>
                </A>
                <span class="text-neutral-500 ml-10">{data.symbol.toUpperCase()}</span>
              </TableCell>
              <TableCell>${data.current_price.toLocaleString()}</TableCell>
              <TableCell>${data.market_cap.toLocaleString()}</TableCell>
              <TableCell>
                <Show
                  when={data.price_change_percentage_24h > 0}
                  fallback={
                    <BadgeDelta deltaType="decrease">
                      {data.price_change_percentage_24h}
                    </BadgeDelta>
                  }
                >
                  <BadgeDelta deltaType="increase">
                    {data.price_change_percentage_24h}
                  </BadgeDelta>
                </Show>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
}
