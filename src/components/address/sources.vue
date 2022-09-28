<template>
  <div>
    <div>
      <aside class="w-full" aria-label="Sidebar">

        <div
          class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800"
        >
          <div class="relative mb-6">
            <div
              class="
                flex
                absolute
                inset-y-0
                left-0
                items-center
                pl-3
                pointer-events-none
              "
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                ></path>
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="input-group-1"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                pl-10
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              placeholder="filter"
              v-model="filter"
            />
          </div>
          <ul class="space-y-2">
            <li v-for="source in getSources">
              <div
                @click="onSourceClick(source)"
                class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                "
              >


                <span class="ml-3">{{ source }}</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["selected"]);

const props = defineProps(["contract"]);
let FILES = Object.keys(props.contract.sourceCode.sources);
const filter = ref("");

let getSourcesRaw = function () {
   if (filter.value == null || filter.value == "") {
    return FILES
  }
  return FILES.filter(function (file) {
      return file.toLowerCase().includes(filter.value.toLowerCase());
  });
};
let getSources = computed(getSourcesRaw);

async function onSourceClick(source) {
  console.log("ONCLICK", source);
  selected.value = source;
  emit("selected", source);
}

const selected = ref(getSourcesRaw()[0]);
emit("selected", selected);
</script>