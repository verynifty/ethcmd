<template>
  <div>
    <Popover class="relative bg-white z-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          class="
            flex
            items-center
            justify-between
            border-b-2 border-gray-100
            py-6
            md:justify-start md:space-x-10
          "
        >
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <router-link class="flex items-center" to="/">
              <svg
                class="h-8 w-auto sm:h-9"
                height="512px"
                style="enable-background: new 0 0 512 512"
                version="1.1"
                viewBox="0 0 512 512"
                width="512px"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="comp_x5F_116-Ethereum">
                  <g>
                    <polygon
                      points="    277.438,370.529 277.438,470.299 399.954,296.348   "
                      style="
                        fill: none;
                        stroke: #000000;
                        stroke-width: 20;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 10;
                      "
                    />
                    <polygon
                      points="    385.532,227.682 275.209,42.348 275.209,177.107   "
                      style="
                        fill: none;
                        stroke: #000000;
                        stroke-width: 20;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 10;
                      "
                    />
                    <polygon
                      points="    277.438,219.138 277.438,318.961 372.419,262.729   "
                      style="
                        fill: none;
                        stroke: #000000;
                        stroke-width: 20;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 10;
                      "
                    />
                    <polygon
                      points="    123.925,230.375 237.438,39.654 237.438,178.331   "
                      style="
                        fill: none;
                        stroke: #000000;
                        stroke-width: 20;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 10;
                      "
                    />
                    <polygon
                      points="    238.002,216.348 238.002,321.752 137.438,262.375   "
                      style="
                        fill: none;
                        stroke: #000000;
                        stroke-width: 20;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 10;
                      "
                    />
                    <polygon
                      points="    237.438,370.227 237.438,472.346 112.046,294.301   "
                      style="
                        fill: none;
                        stroke: #000000;
                        stroke-width: 20;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 10;
                      "
                    />
                  </g>
                </g>
                <g id="Layer_1" />
              </svg>
              <span
                ><div class="font-bold">ETHCMD</div>
                <div class="text-xs font-light text-right">
                  {{ networkName }}
                </div></span
              >
            </router-link>
          </div>
            <router-link to="/explore" class="text-base font-medium text-gray-500 hover:text-gray-900">Hot contracts</router-link>
            <router-link to="/tools" class="text-base font-medium text-gray-500 hover:text-gray-900">Tools</router-link>

          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton
              class="
                inline-flex
                items-center
                justify-center
                rounded-md
                bg-white
                p-2
                text-gray-400
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-indigo-500
              "
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
            <Popover class="relative" v-slot="{ open }">
              <PopoverButton
                :class="[
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                ]"
              >
                <span>Chains</span>
                <ChevronDownIcon
                  :class="[
                    open ? 'text-gray-600' : 'text-gray-400',
                    'ml-2 h-5 w-5 group-hover:text-gray-500',
                  ]"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="
                    absolute
                    z-10
                    -ml-4
                    mt-3
                    w-screen
                    max-w-md
                    transform
                    px-2
                    sm:px-0
                    lg:left-1/2 lg:ml-0 lg:-translate-x-1/2
                  "
                >
                  <div
                    class="
                      overflow-hidden
                      rounded-lg
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                    "
                  >
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <a v-for="item in network" :key="item.name" :href="item.href" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                      <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
                        <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                      </div>
                    </a>
                  </div>
                  <!--
                    <div
                      class="
                        space-y-6
                        bg-gray-50
                        px-5
                        py-5
                        sm:flex sm:space-y-0 sm:space-x-10 sm:px-8
                      "
                    >
                      <div
                        v-for="item in network"
                        :key="item.name"
                        class="flow-root"
                      >
                        <a
                          :href="item.href"
                          class="
                            -m-3
                            flex
                            items-center
                            rounded-md
                            p-3
                            text-base
                            font-medium
                            text-gray-900
                            hover:bg-gray-100
                          "
                        >
                          <component
                            :is="item.icon"
                            class="h-6 w-6 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span class="ml-3">{{ item.name }}</span>
                        </a>
                      </div>
                    </div>
                    -->
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <!--
          <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">Pricing</a>
          <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">Docs</a>
-->
            <!--
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
              <span>More</span>
              <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <a v-for="item in resources" :key="item.name" :href="item.href" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                      <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
                        <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                      </div>
                    </a>
                  </div>
                  <div class="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                    <div>
                      <h3 class="text-base font-medium text-gray-500">Recent Posts</h3>
                      <ul role="list" class="mt-4 space-y-4">
                        <li v-for="post in recentPosts" :key="post.id" class="truncate text-base">
                          <a :href="post.href" class="font-medium text-gray-900 hover:text-gray-700">{{ post.name }}</a>
                        </li>
                      </ul>
                    </div>
                    <div class="mt-5 text-sm">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        View all posts
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          -->
          </PopoverGroup>
          <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <ConnectButton />
          </div>
        </div>
      </div>

      <transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          class="
            absolute
            inset-x-0
            top-0
            origin-top-right
            transform
            p-2
            transition
            md:hidden
          "
        >
          <div
            class="
              divide-y-2 divide-gray-50
              rounded-lg
              bg-white
              shadow-lg
              ring-1 ring-black ring-opacity-5
            "
          >
            <div class="px-5 pt-5 pb-6">
              <div class="flex items-center justify-between">
                <div>
                  <svg
                    class="h-8 w-auto sm:h-9"
                    height="512px"
                    style="enable-background: new 0 0 512 512"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="512px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="comp_x5F_116-Ethereum">
                      <g>
                        <polygon
                          points="    277.438,370.529 277.438,470.299 399.954,296.348   "
                          style="
                            fill: none;
                            stroke: #000000;
                            stroke-width: 20;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                          "
                        />
                        <polygon
                          points="    385.532,227.682 275.209,42.348 275.209,177.107   "
                          style="
                            fill: none;
                            stroke: #000000;
                            stroke-width: 20;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                          "
                        />
                        <polygon
                          points="    277.438,219.138 277.438,318.961 372.419,262.729   "
                          style="
                            fill: none;
                            stroke: #000000;
                            stroke-width: 20;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                          "
                        />
                        <polygon
                          points="    123.925,230.375 237.438,39.654 237.438,178.331   "
                          style="
                            fill: none;
                            stroke: #000000;
                            stroke-width: 20;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                          "
                        />
                        <polygon
                          points="    238.002,216.348 238.002,321.752 137.438,262.375   "
                          style="
                            fill: none;
                            stroke: #000000;
                            stroke-width: 20;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                          "
                        />
                        <polygon
                          points="    237.438,370.227 237.438,472.346 112.046,294.301   "
                          style="
                            fill: none;
                            stroke: #000000;
                            stroke-width: 20;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                          "
                        />
                      </g>
                    </g>
                    <g id="Layer_1" />
                  </svg>
                </div>
                <div class="-mr-2">
                  <PopoverButton
                    class="
                      inline-flex
                      items-center
                      justify-center
                      rounded-md
                      bg-white
                      p-2
                      text-gray-400
                      hover:bg-gray-100 hover:text-gray-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-inset
                      focus:ring-indigo-500
                    "
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </PopoverButton>
                </div>
              </div>
              <!--
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                  <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                  <span class="ml-3 text-base font-medium text-gray-900">{{ item.name }}</span>
                </a>
              </nav>
            </div>
          </div>
          <div class="space-y-6 py-6 px-5">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>

              <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Docs</a>
              <a v-for="item in resources" :key="item.name" :href="item.href" class="text-base font-medium text-gray-900 hover:text-gray-700">{{ item.name }}</a>
            </div>
            -->
              <div>
                <ConnectButton />
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
    <ChangeNetwork />
  </div>
</template>

<script setup>
import ConnectButton from "@/components/account/ConnectButton.vue";
import ChangeNetwork from "@/components/account/ChangeNetwork.vue";

const networkName = process.env.CHAINNAME;
const chainId = process.env.CHAINID;

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const network = [
  {
    name: "Mainnet",
    description: "",
    href: "https://www.ethcmd.com",
    icon: ChartBarIcon,
  },
  {
    name: "Arbitrum",
    description: "",
    href: "https://arbitrum.ethcmd.com",
    icon: ChartBarIcon,
  },
  {
    name: "Optimism",
    description: "",
    href: "https://optimism.ethcmd.com",
    icon: ChartBarIcon,
  },
  {
    name: "Goerli testnet",
    description: "",
    href: "https://goerli.ethcmd.com",
    icon: ChartBarIcon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const solutions = [
  {
    name: "Mainnet",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://ethcmd.com",
    icon: LifebuoyIcon,
  },
  {
    name: "Arbitrum",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://arbitrum.ethcmd.com",
    icon: LifebuoyIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];
</script>