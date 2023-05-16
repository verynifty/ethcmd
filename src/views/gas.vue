

<template class="">
  <div class="m-5">
    <h1 class="text-2xl font-bold mb-2">Ethereum gas price</h1>
    <div>
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Gas recommendations:
      </h3>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="item in stats"
          :key="item.name"
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt class="truncate text-sm font-medium text-gray-500">
            {{ item.name }}
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {{ item.stat }}
          </dd>
        </div>
      </dl>
      <h3 class="text-base font-semibold leading-6 text-gray-900 mt-10">
        What is gas price?
      </h3>
      <p class="mt-4">
        The gas price refers to the fee or cost you are willing to pay for each
        unit of computation or operation executed on the Ethereum network. Gas
        is the unit used to measure the computational effort required to execute
        specific actions such as transferring Ether, interacting with smart
        contracts, or deploying a new contract.
      </p>
      <p class="mt-4">
        Gas prices are denominated in Gwei, which is a smaller denomination of
        Ether. When you submit a transaction or perform an operation on the
        Ethereum network, you specify the gas price you are willing to pay per
        unit of gas consumed by that operation. Miners, who validate and process
        transactions, are incentivized to prioritize transactions with higher
        gas prices, as they earn the fees associated with the transactions they
        include in the blockchain.
      </p>
      <p class="mt-4">
        The total cost of a transaction or operation on Ethereum is calculated
        by multiplying the gas price (in Gwei) by the amount of gas units
        consumed. The gas limit is the maximum amount of gas you are willing to
        pay for a particular transaction or operation. If the computation or
        operation exceeds the gas limit specified, the transaction will fail.
      </p>
      <p class="mt-4">
        Gas prices can fluctuate depending on network demand and congestion.
        During times of high demand, gas prices tend to increase as users
        compete to have their transactions processed quickly. Conversely, when
        the network is less congested, gas prices may be lower.
      </p>
      <p class="mt-4">
        It's worth noting that gas prices are separate from the value of Ether
        itself. Gas prices are used to compensate miners for the computational
        resources they expend in processing and validating transactions, while
        the value of Ether is determined by supply and demand dynamics in the
        broader market.
      </p>
      <p class="mt-4">
        When interacting with the Ethereum network, it's important to consider
        gas prices to ensure your transactions are processed efficiently and
        within your desired timeframe. Several tools and platforms provide
        real-time information on current gas prices, helping users make informed
        decisions about setting appropriate gas prices for their transactions.
      </p>
    </div>
  </div>
</template>

<script setup>
document.title = "Gas prices - ETHCMD";

import axios from "axios";
let stats = [];
let etherscan = process.env.ETHERSCAN_API_KEY;
let gasprice = await axios.get(
  "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" +
    etherscan
);
gasprice = gasprice.data;
stats.push({
  name: "SafeLow",
  stat: gasprice.result.SafeGasPrice,
});
stats.push({
  name: "Average",
  stat: gasprice.result.ProposeGasPrice,
});
stats.push({
  name: "Fast",
  stat: gasprice.result.FastGasPrice,
});
console.log(gasprice);
</script>