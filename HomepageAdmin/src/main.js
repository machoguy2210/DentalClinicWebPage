
import { createApp } from 'vue';

import 'primevue/resources/themes/lara-light-blue/theme.css'

import 'primeicons/primeicons.css';

import 'primeflex/themes/primeone-light.css';

import '/node_modules/primeflex/primeflex.css';

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

const app = createApp(App);

app.use(PrimeVue);

app.component('Button',Button);
app.component('InputText',InputText);
app.component('Dropdown',Dropdown);
app.component('Chart',Chart);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);
app.component('Row',Row);

app.mount('#app');
