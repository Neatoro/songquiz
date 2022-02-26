import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {

    constructor(private readonly http: HttpService) {}

    list(accessToken) {
        return new Promise((resolve) => {
            this.http
                .get('https://api.spotify.com/v1/browse/categories?limit=50&country=DE&locale=de_DE', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .subscribe((response) => {
                    resolve(response.data.categories.items)
                });
        });
    }

    getPlaylists(accessToken, id) {
        return new Promise((resolve) => {
            this.http
                .get(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=10&country=DE&locale=de_DE`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .subscribe((response) => {
                    resolve(response.data.playlists.items)
                });
        });
    }

};
