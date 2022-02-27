import { writable } from 'svelte/store';

export const state = writable({
    status: 'selection',
    songs: []
});

export function updateStatus(newStatus) {
    state.update((self) => {
        self.status = newStatus;
        return self;
    });
};

export async function loadSongs(playlists = []) {
    const playlistsParam = playlists.map((playlist) => playlist.id).join(',');
    const response = await fetch(`/api/songs?playlists=${playlistsParam}`);
    const songs = await response.json();

    state.update((self) => {
        self.songs = songs;
        return self;
    });
};
