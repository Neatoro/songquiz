<script>
import { state } from './store';

let songs;
state.subscribe((self) => {
    songs = self.songs;
});

</script>

<ul>
    {#each songs as song}
    <li>{song.track.name}</li>
    {/each}
</ul>
