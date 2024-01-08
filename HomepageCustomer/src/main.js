
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
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import Password from 'primevue/password';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Fieldset from 'primevue/fieldset';
import Rating from 'primevue/rating';
import Tooltip from 'primevue/tooltip';
import Dialog from 'primevue/dialog';

import PrimeVue from 'primevue/config';
import router from './router';


const app = createApp(App);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('ScrollPanel',ScrollPanel);
app.component('Carousel',Carousel);
app.component('Tag',Tag);
app.component("Textarea", Textarea);
app.component("Password", Password);
app.component("FileUpload", FileUpload);
app.component("Toast", Toast);
app.component("ToastService", ToastService);
app.component("Image", Image);
app.component("InlineMessage", InlineMessage);
app.component("Fieldset", Fieldset);
app.component("Rating", Rating);
app.component("RadioButton", RadioButton);
app.component("Dialog", Dialog);

app.directive('tooltip', Tooltip);

app.use(router);
app.use(PrimeVue);
app.use( VueSplide );
app.use(ToastService);
app.mount('#app');