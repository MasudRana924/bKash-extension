import Echo from 'laravel-echo';
import Reverb from 'reverb-js';
window.Reverb = Reverb;
const echo = new Echo({
broadcaster: 'reverb',
key: 'your-reverb-app-key',
cluster: 'your-reverb-app-cluster',
forceTLS: true,
wsHost: 'your-laravel-server-ip', // Replace with your Laravel server IP
wsPort: 6001,
disableStats: true,
});
export default echo;