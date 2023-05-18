<template>
  <aside class="w-full flex-col h-full overflow-hidden" aria-label="Sidebar">
    <div
      class="overflow-y-hidden h-full py-1 px-2 bg-gray-800 flex flex-col h-full"
    >
      <div class="relative mb-2">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
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
          class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="filter"
          v-model="filter"
        />
      </div>

      <ul class="h-full overflow-scroll">
        <li v-for="func in getFunctions">
          <div
            @click="onFunctionClick(func)"
            :class="[
              'flex items-center p-1 text-s font-light text-white rounded-lg  cursor-pointer	 hover:bg-gray-700',
              func.proxyImplementation == true ? 'text-yellow-100	' : ' ',
            ]"
          >
            <span class="mr-1">
              {{ func.id }}
            </span>
            <svg
              v-if="func.stateMutability == 'view'"
              class="w-6 h-6 text-gray-500"
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <svg
              v-if="func.stateMutability == 'nonpayable'"
              class="w-6 h-6 text-gray-500"
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
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <svg
              v-if="func.stateMutability == 'payable'"
              class="w-6 h-6 text-gray-500"
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
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span class="ml-1"> {{ func.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const emit = defineEmits(["selected"]);

const props = defineProps(["contract"]);
let ABI = props.contract.ABI;
ABI = ABI.filter((item) => item.type == "function");

const filter = ref("");

let getFunctionsRaw = function () {
  if (filter.value == null || filter.value == "") {
    return ABI;
  }
  return ABI.filter(function (func) {
    return func.name.toLowerCase().includes(filter.value.toLowerCase());
  });
};
let getFunctions = computed(getFunctionsRaw);

let selected = ref({});
async function onFunctionClick(func, changeRoute = true) {
  if (changeRoute) {
    router.push({
      path: router.currentRoute.value.path,
      query: { function: func.signature },
    });
  }
  selected.value = func;
  emit("selected", func);
}

function getFuncById(id) {
  let isNumber = true;
  if (typeof id == "string") {
    isNumber = false;
    console.log("isString");
  }
  let fs = getFunctionsRaw();
  for (const f of fs) {
    if (isNumber) {
      console.log("isNumber");
      if (f.id == parseInt(id)) {
        return f;
      }
    } else if (f.signature.toLowerCase() == id.toLowerCase()) {
      return f;
    }
  }
}

let queryFunc = route.query.function;
console.log(queryFunc);
if (queryFunc != null) {
  queryFunc = queryFunc;
} else {
  queryFunc = 1;
}

onFunctionClick(getFuncById(queryFunc), false);
</script>