<script>
import { state } from './store';
import Progress from './Progess.svelte';
import Progess from './Progess.svelte';

let songs;
let currentSong;
let deviceId;
let showSolution = false;
let countdown = 30;

state.subscribe((self) => {
    songs = self.songs;
    deviceId = self.deviceId;
    startRound();
});

function random() {
    return Math.floor(Math.random() * songs.length);
}

async function startRound() {
    showSolution = false;
    countdown = 30;
    currentSong = songs[random()];
    songs = songs.filter((song) => song.track.id !== currentSong.track.id)
    await fetch(`/api/songs/play?song=${currentSong.track.uri}&device_id=${deviceId}`, {
        method: 'PUT'
    });
    const timer = setInterval(
        () => {
            countdown -= 0.1;
            if (countdown <= 0) {
                showSolution = true;
                clearInterval(timer);
            }
        },
        100
    );
}

</script>

<main>
    {#if showSolution}
    <p>{currentSong.track.name}</p>
    <p>{currentSong.track.artists.map((art) => art.name).join(', ')}</p>
    <p><button on:click={startRound}>Nächste Runde</button></p>
    {:else}
    <Progess data={((30 - countdown) / 30) * 100} />
    {/if}
</main>

<style>
main {
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

p {
    font-size: 64px;
}
</style>
