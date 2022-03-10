<script>
import { onMount } from 'svelte';
import { loadSongs, updateStatus } from './store';

let categories = [];
let playlists = [];
let selection = [];
let selectedCategory = undefined;

onMount(async () => {
    const response = await fetch('/api/categories');
    categories = await response.json();
});

function selectCategory(category) {
    selectedCategory = category;
    loadPlaylists();
}

function addPlaylist(playlist) {
    if (selection.find((k) => k.id === playlist.id)) {
        return;
    }

    if (selection.length === 3) {
        return;
    }

    selection = [...selection, playlist];
}

function removePlaylist(playlist) {
    selection = selection.filter((p) => p.id !== playlist.id);
}

async function loadPlaylists() {
    const response = await fetch('/api/categories/' + selectedCategory.id + '/playlists');
    playlists = await response.json();
}

function backToCategories() {
    playlists = [];
    selectedCategory = undefined;
}

async function startGame() {
    await loadSongs(selection);
    updateStatus('game');
}

</script>

<main>
    <section class="content-section">
        <h2>Wähle 3 Playlisten aus</h2>
        {#if playlists.length === 0}
        <ul class="categories">
            {#each categories as category}
            <li class="category" on:click={() => selectCategory(category)}>
                <img class="category__image" src={category.icons[0].url} alt={category.name}>
                <p class="category__title">{category.name}</p>
            </li>
            {/each}
        </ul>
        {:else}
            <button on:click={backToCategories}>Zurück</button>
            <ul class="categories">
                {#each playlists as playlist}
                <li class="category" on:click={() => addPlaylist(playlist)}>
                    <img class="category__image" src={playlist.images[0].url} alt={playlist.name}>
                    <p class="category__title">{playlist.name}</p>
                </li>
                {/each}
            </ul>
        {/if}
    </section>

    <section class="info-section">
        <h2>Deine gewählten Playlists ({selection.length}/3)</h2>
        <ul class="categories categories--small">
            {#each selection as playlist}
            <li class="category" on:click={() => removePlaylist(playlist)}>
                <img class="category__image" src={playlist.images[0].url} alt={playlist.name}>
                <p class="category__title">{playlist.name}</p>
            </li>
            {/each}
        </ul>
        {#if selection.length === 3}
        <button on:click={startGame}>Spiel starten</button>
        {/if}
    </section>
</main>

<style>
main {
    display: grid;
    grid-template-columns: 3fr 1fr;
}

.categories {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
}

.categories--small {
    grid-template-columns: 1fr;
}

.category {
    display: flex;
    flex-direction: column;
    align-items: center;

    animation: pop ease-in 0.7s;
}

.category__image {
    width: 10vw;
}

@keyframes pop {
  from {
    transform: scale(0.5);
    opacity: 0.3;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
