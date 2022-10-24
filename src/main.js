import { createApp } from 'vue'
import { createPinia } from 'pinia'

import timeago from 'vue-timeago3'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

import { VAceEditor } from 'vue3-ace-editor';
import 'ace-mode-solidity/build/remix-ide/mode-solidity.js';
import 'ace-builds/src-noconflict/theme-chaos';

app.component("v-ace-editor", VAceEditor)

import JsonViewer from 'vue-json-viewer'
app.use(JsonViewer)

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";
app.use(VueAwesomePaginate)

app.use(createPinia())
app.use(timeago)

app.use(router)

app.mount('#app')
