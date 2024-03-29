/* index script */
import {app} from "./views/app.js";

axios.defaults.baseURL = 'https://api.duck-vs-bems.ru';

app.mount('#app')

