<template>
  <div>dsfkdshfdsj</div>
</template>

<script setup>
import { useWeb3Store } from "@/stores/web3";

const web3 = useWeb3Store();
const ethers = await web3.getEthersAndConnect();

let isLoading = true;
let toBlock = await ethers.getBlockNumber("latest");
let fromBlock = toBlock - 2;
console.log(toBlock);

let blocksPromises = [];
for (let index = fromBlock; index < toBlock; index++) {
  blocksPromises.push(ethers.getBlockWithTransactions(index));
}
console.log(blocksPromises);
const blocks = await Promise.all(blocksPromises);
console.log(blocks);

let targetContract = {};
let targetFuncion = {};

for (const b of blocks) {
  for (const t of b.transactions) {
    if (t.data == null) continue;
    let funcSelector = t.data.substring(0, 10).toLowerCase();
    if (funcSelector.length != 10) continue;
    if (targetContract[t.to] == null) {
      targetContract[t.to] = {
        caller: [],
      };
    }
  }
}
</script>