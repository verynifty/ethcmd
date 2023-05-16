

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">🛠️ Tools</h2>
          <p class="mt-4 text-base leading-7 text-gray-600">A collection of tools for Ethereum users and developers.</p>
        </div>
        <div class="mt-10 lg:col-span-7 lg:mt-0">
          <dl class="space-y-20 ">
            <router-link :to="tool.path" v-for="tool in tools" :key="tool.title">
                <div class="rounded-lg bg-slate-100 shadow p-2 mt-5">
              <dt class="text-base font-semibold leading-7 text-gray-900">{{ tool.title }}</dt>
              <dd class="mt-2 text-base leading-7 text-gray-600">{{ tool.description }}</dd>
              </div>
            </router-link>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
document.title = "Tools - ETHCMD";

const tools = [
  {
    title: "Ethereum unit converter",
    path: "/tools/ethereum-unit-converter",
    description:
      "Convert easily between Ether, Gwei and Wei.",
  },
    {
    title: "Gas price",
    path: "/tools/gas-price",
    description:
      "Recommended gas prices for sending Ethereum transactions.",
  },
     {
    title: "Copy a transaction",
    path: "/tools/copy-transaction",
    description:
      "Execute an existing transaction on the Ethereum network from you own address.",
  },
       {
    title: "Int3nt, share transactions",
    path: "/int3nt",
    description:
      "An easy way to build transactions and share them with others to execute.",
  },
   {
    title: "Calldata decoder",
    path: "/tools/decode-calldata",
    description:
      "Guess the type for any ABI-encoded blob of data, such as call data, return data, or anything that was created with abi.encode().",
  },
]
</script>