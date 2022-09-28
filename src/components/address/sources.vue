<template>
  <div>
    <div>
      <aside class="w-full" aria-label="Sidebar">
        <div
          class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800"
        >
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

let getSourcesRaw = function () {
  return FILES;
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