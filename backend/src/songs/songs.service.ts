import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {

    constructor(private readonly http: HttpService) {}

    _requestSongs(accessToken, url): Promise<Array<any>> {
        return new Promise((resolve) => {
            this.http
                .get(url, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .subscribe(async (response) => {
                    if (response.data.next) {
                        resolve(
                            [
                                ...response.data.items,
                                ...(await this._requestSongs(accessToken, response.data.next))
                            ]
                        )
                    } else {
                        resolve(response.data.items)
                    }
                });
        });
    }

    async list(accessToken, playlists) {
        let songs = [];
        for (let playlist of playlists) {
            songs = [
                ...songs,
                ...(await this._requestSongs(accessToken, `https://api.spotify.com/v1/playlists/${playlist}/tracks?fields=next,items(track.id,track.artists,track.name,track.album.images,track.uri)`))
            ];
        }
        return songs;
    }

    play(accessToken, song, deviceId) {
        return new Promise((resolve) => {
            this.http
                .put(
                    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                    { uris: [song] },
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                )
                .subscribe(() => resolve({ song, device_id: deviceId }));
        });
    }

};
