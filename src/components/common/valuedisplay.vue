<template>
  <div class="">
    <div v-if="type.startsWith('uint')">
      {{ type }} - {{ name }}
      <form>
        <div
          class="
            flex
            grow
            items-center
            py-2
            px-3
            bg-gray-50
            rounded-lg
            dark:bg-gray-700
          "
        >
          <input
            readonly
            class="
              block
              mx-2
              p-2.5
              w-full
              text-sm text-gray-900
              bg-white
              rounded-lg
              border border-gray-300
              focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-800
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            :value="getValue()"
          />
          <button
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
        </div>
      </form>
    </div>
    <div v-else>{{ type }} {{ name }} {{ getValue() }}</div>
  </div>
</template>

<script setup>
import { watch, ref, computed } from "vue";

const props = defineProps(["value", "type", "name"]);

let display = ref("raw");

function getValue() {
  if (display.value == "raw") {
    return props.value;
  } else if (display.value == "ether") {
    return parseInt(props.value) / 1e18;
  }
}
</script>