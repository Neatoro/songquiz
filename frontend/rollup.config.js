import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte';

export default {
    input: 'src/svelte/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        svelte({
            emitCss: false
        }),
        resolve({ browser: true }),
        copy({
            targets: [
                {
                    src: 'src/resources/**/*',
                    dest: 'dist'
                }
            ]
        })
    ]
};
