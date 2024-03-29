import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExploreView from '../views/ExploreView.vue'

import AddressView from '../views/address/functions.vue'
import BlockView from '../views/block/index.vue'
import TransactionView from '../views/transaction/index.vue'

import AddressSourceView from '../views/address/sourcecode.vue'
import AddressInformations from '../views/address/informations.vue'
import AddressEvents from '../views/address/events.vue'
import AddressTransactions from '../views/address/AddressTransactions.vue'

import MevStats from '../views/mev.vue'
import GasStats from '../views/gas.vue'

import tools from '../views/tools.vue'
import copytx from '../views/tools/copytx.vue'
import decodeEncodedData from '../views/decodeEncodedData.vue'
import unitConverter from '../views/unitConverter.vue'

import intent from '../views/intent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mev-stats',
      name: 'mev_stats',
      component: MevStats
    },
    {
      path: '/int3nt',
      name: 'intent',
      component: intent
    },
    {
      path: '/tools/gas-price',
      name: 'gas_price',
      component: GasStats
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/address/:address/sourcecode',
      name: 'addresssource',
      component: AddressSourceView
    },
    {
      path: '/address/:address/events',
      name: 'addressevents',
      component: AddressEvents
    },
    {
      path: '/address/:address/infos',
      name: 'addressinfos',
      component: AddressInformations
    },
    {
      path: '/address/:address/transactions',
      name: 'addressTransactions',
      component: AddressTransactions
    },
    {
      path: '/address/:address/',
      name: 'address',
      component: AddressView
    },
    {
      path: '/block/:blocknumber/',
      name: 'block',
      component: BlockView
    },
    {
      path: '/tx/:hash/',
      name: 'transaction',
      component: TransactionView
    },
    {
      path: '/tools/',
      name: 'tools',
      component: tools
    },
    {
      path: '/tools/decode-calldata/',
      name: 'decodeEncodedData',
      component: decodeEncodedData
    },
    {
      path: '/tools/copy-transaction/',
      name: 'copytx',
      component: copytx
    },
    {
      path: '/tools/ethereum-unit-converter/',
      name: 'unitConverter',
      component: unitConverter
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
