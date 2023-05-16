

<template>
  <div class="h-full bg-gray-100 overflow-scroll p-10">
    <p class="mb-5">
      Guess the type for any ABI-encoded blob of data, such as call data, return
      data, or anything that was created with abi.encode(). A tool using:
      <a class="text-blue-900" href="https://github.com/samczsun/abi-guesser"
        >samczsun/abi-guesser</a
      >
    </p>
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900"
      >Raw calldata</label
    >
    <textarea
      v-model="calldata"
      rows="4"
      class="
        block
        p-2.5
        w-full
        text-sm text-gray-900
        bg-gray-50
        rounded-lg
        border border-gray-300
        focus:ring-blue-500 focus:border-blue-500
      "
      placeholder="Write your thoughts here..."
    ></textarea>
    <label
      for="message"
      class="block mb-2 text-sm font-medium text-gray-900 mt-2"
      >Guessed ABI:</label
    >
   <json-viewer
                :value="decodedFragment"
                :expand-depth="4"
                copyable
                boxed
              ></json-viewer>
    
      <label
      for="message"
      class="block mb-2 text-sm font-medium text-gray-900 mt-2"
      >Decoded params:</label
    >
   <json-viewer
                :value="decodedParams"
                :expand-depth="4"
                copyable
                boxed
              ></json-viewer>
  </div>
</template>

<script setup>
import {
  guessAbiEncodedData,
  guessFragment,
} from "@samczsun/abi-guesser/dist/encode-guesser";

import { ethers } from "ethers";

document.title = "Call data decoder - ETHCMD";

import { ref, watch, computed } from "vue";

let calldata = ref(
  "0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260"
);

const decodedFragment = computed(() => {
  try {
    const types = guessFragment(calldata.value);
    let rawTypes = []
    for (const i of types.inputs) {
        rawTypes.push(i.type)
    }
    console.log(ethers.utils.defaultAbiCoder.decode(rawTypes, ethers.utils.hexDataSlice(calldata.value, 4)));
    return (types);
  } catch (error) {
      console.log(error)
  }
  return null;
});

const decodedParams = computed(() => {
  try {
    const types = guessFragment(calldata.value);
    let rawTypes = []
    for (const i of types.inputs) {
        rawTypes.push(i.type)
    }
    let decoded = ethers.utils.defaultAbiCoder.decode(rawTypes, ethers.utils.hexDataSlice(calldata.value, 4))
    console.log(decoded)
    let res = []
    for (const d of decoded) {
      res.push(d.toString());
    }
    return (res);
  } catch (error) {
      console.log(error)
  }
  return null;
});
</script>