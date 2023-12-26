import { createApp } from 'vue';
import App from './App.vue';
// import VueRouter from 'vue-router';

import 'primevue/resources/themes/lara-light-blue/theme.css';

import 'primeicons/primeicons.css';

import 'primeflex/themes/primeone-light.css';

import '/node_modules/primeflex/primeflex.css';

import '/src/assets/over-write.css';

import PrimeVue from 'primevue/config';

// PrimeVue
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';   // optional
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";


const app = createApp(App);

// app.use(VueRouter);
app.use(PrimeVue);

app.directive('badge', BadgeDirective);

app.component('Button',Button);
app.component('InputText',InputText);
app.component('Dropdown',Dropdown);
app.component('Chart',Chart);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);
app.component('Row',Row);
app.component('Avatar',Avatar);
app.component('AvatarGroup',AvatarGroup);
app.component('Badge',Badge);

app.mount('#app');
