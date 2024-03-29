/* index script */
import {app} from "./views/app.js";

axios.defaults.baseURL = 'https://api.shooter.cwcwcw.ru';

app.mount('#app')

