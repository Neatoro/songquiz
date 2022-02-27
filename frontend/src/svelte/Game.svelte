<script>
import { state } from './store';

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
            --countdown;
            if (countdown === 0) {
                showSolution = true;
                clearInterval(timer);
            }
        },
        1000
    );
}

</script>
<p>{countdown}s</p>
{#if showSolution}
<p>{currentSong.track.name} - {currentSong.track.artists.map((art) => art.name).join(', ')}</p>
<button on:click={startRound}>Nächste Runde</button>
{/if}
