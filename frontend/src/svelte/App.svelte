<script>
import { state } from './store';
import PlaylistSelection from './PlaylistSelection.svelte';
import Game from './Game.svelte';

const statusComponents = {
    selection: PlaylistSelection,
    game: Game
};

let viewedComponent;
state.subscribe(({ status }) => {
    viewedComponent = statusComponents[status];
});

</script>

<svelte:component this={viewedComponent} />
