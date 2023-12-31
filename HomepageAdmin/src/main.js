
import { createApp } from 'vue';

import 'primevue/resources/themes/lara-light-blue/theme.css'

import 'primeicons/primeicons.css';

import 'primeflex/themes/primeone-light.css';

import 'primeflex/primeflex.css';

import '/src/assets/over-write.css';

import PrimeVue from 'primevue/config';

import App from './App.vue';

// PrimeVue
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';   // optional
import router from './router';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('Button',Button);
app.component('InputText',InputText);
app.component('Dropdown',Dropdown);
app.component('Chart',Chart);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);
app.component('Row',Row);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);

app.mount('#app');
