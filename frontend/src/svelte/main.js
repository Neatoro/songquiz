import App from './App.svelte';
import { setDeviceId } from './store';

window.onSpotifyWebPlaybackSDKReady = async () => {
    const response = await fetch('/api/token');
    const token = (await response.json()).accessToken;

    const player = new Spotify.Player({
        name: 'Song Quiz',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });
    player.addListener('ready', ({ device_id }) => {
        console.log('Player ready with id', device_id);
        setDeviceId(device_id);
        bootstrap();
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.connect();
}

function bootstrap() {
    new App({
        target: document.body
    });
}
