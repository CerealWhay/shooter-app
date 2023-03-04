/* index script */
import {app} from "./views/app.js";

axios.defaults.baseURL = 'https://api.cerealwhay.ru';

app.mount('#app')

