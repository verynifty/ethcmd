<template>
  <div class="">
    <div>
      <form>
        <div class="flex grow items-center p-1 bg-gray-100 rounded-lg">
          {{ type }}
          <div
            class="
              block
              mx-2
              p-2.5
              w-full
              text-sm text-gray-900
              bg-white
              rounded-lg
              border border-gray-300
              break-all
            "
          >
            {{ getValue() }}
          </div>

          <button
            v-if="type.startsWith('uint')"
            type="button"
            @click="display = 'raw'"
            class="
              p-2
              text-gray-500
              rounded-lg
              cursor-pointer
              hover:text-gray-900 hover:bg-gray-100
              dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600
            "
            v-bind:class="{ 'bg-gray-100': display == 'raw' }"
          >
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </button>
          <button
            v-if="type.startsWith('uint')"
            @click="display = 'ether'"
            type="button"
            class="
              p-2
              text-gray-500
              rounded-lg
              cursor-pointer
              hover:text-gray-900 hover:bg-gray-100
              dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600
            "
            v-bind:class="{ 'bg-gray-100': display == 'ether' }"
          >
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
              />
            </svg>
          </button>
          <button
            v-if="type == 'bytes'"
            type="button"
            @click="display = 'raw'"
            class="
              p-2
              text-gray-500
              rounded-lg
              cursor-pointer
              hover:text-gray-900 hover:bg-gray-100
              dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600
            "
            v-bind:class="{ 'bg-gray-100': display == 'raw' }"
          >
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </button>
          <button
            v-if="type == 'bytes'"
            @click="display = 'string'"
            type="button"
            class="
              p-2
              text-gray-500
              rounded-lg
              cursor-pointer
              hover:text-gray-900 hover:bg-gray-100
              dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600
            "
            v-bind:class="{ 'bg-gray-100': display == 'ether' }"
          >
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed } from "vue";
import { ethers } from "ethers";

const props = defineProps(["value", "type", "name"]);

let display = ref("raw");

function a2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join("");
}

function getValue() {
  if (display.value == "raw") {
    return props.value;
  } else if (display.value == "ether") {
    return parseInt(props.value) / 1e18;
  } else if (display.value == "string") {
    return ethers.utils.toUtf8String(props.value);
  }
}
</script>