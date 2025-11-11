import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
    plugins: [angular()],
    optimizeDeps: {
        // Skip pre-bundling these CommonJS deps
        exclude: ['@grpc/grpc-js', '@grpc/proto-loader'],
    },
    ssr: {
        // Don’t try to convert these to ESM
        noExternal: ['@angular/*', '@firebase/*', '@grpc/grpc-js', '@grpc/proto-loader'],
    },
});
