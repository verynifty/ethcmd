<template>
  <div>
      <aside
        class="w-full flex-col h-full overflow-hidden"
        aria-label="Sidebar"
      >
        <div
          class="
            overflow-y-hidden
            h-full
            py-1
            px-2
            bg-gray-800
            flex flex-col
            h-full
          "
        >
          <div class="relative mb-1">
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
                class="w-5 h-5 text-gray-400"
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-1"
              class="
                border
                text-sm
                rounded-lg
                block
                w-full
                pl-10
                p-2.5
                bg-gray-700
                border-gray-600
                placeholder-gray-400
                text-white
                focus:ring-blue-500 focus:border-blue-500
              "
              placeholder="filter"
              v-model="filter"
            />
          </div>

          <ul class="h-full overflow-scroll">
            <li v-for="source in getSources">
              <div
                @click="onSourceClick(source)"
                class="
                  flex
                  cursor-pointer
                  items-center
                  p-1
                  text-base
                  font-normal
                  rounded-lg
                  text-white
                  hover:bg-gray-700
                "
              >
                <span class="ml-1">{{ source }}</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["selected"]);
let FILES = null;
const filter = ref("");

async function onSourceClick(source) {
  console.log("ONCLICK", source);
  selected.value = source;
  emit("selected", source);
}

const props = defineProps(["contract"]);

let getSourcesRaw = function () {
  if (filter.value == null || filter.value == "") {
    return FILES;
  }
  return FILES.filter(function (file) {
    return file.toLowerCase().includes(filter.value.toLowerCase());
  });
};
let getSources = computed(getSourcesRaw);

if (
  props.contract.sourceCode == null ||
  props.contract.sourceCode.sources == null
) {
  console.log("No source file detected.")
} else {
  FILES = Object.keys(props.contract.sourceCode.sources);
  const selected = ref(getSourcesRaw()[0]);
  emit("selected", selected);
}
</script>