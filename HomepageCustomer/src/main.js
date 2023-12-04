
import { createApp } from 'vue';
import App from './App.vue';
import VueSplide from '@splidejs/vue-splide';


import '/node_modules/primeflex/primeflex.css';
import 'primevue/resources/themes/bootstrap4-light-purple/theme.css';
import 'primeflex/themes/primeone-light.css';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import '@splidejs/vue-splide/css';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ScrollPanel from 'primevue/scrollpanel';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';

import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue);
app.use( VueSplide );
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('ScrollPanel',ScrollPanel);
app.component('Carousel',Carousel);
app.component('Tag',Tag);

app.mount('#app');