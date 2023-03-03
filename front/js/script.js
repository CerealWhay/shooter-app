/* index script */
import {app} from "./views/app.js";

axios.defaults.baseURL = 'https://api.cerealwhay.ru';
// axios.defaults.baseURL = 'https://api.cerealwhay.ru';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;


app.mount('#app')

