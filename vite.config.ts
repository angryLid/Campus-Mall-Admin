import vue from "@vitejs/plugin-vue"
import jsx from "@vitejs/plugin-vue-jsx"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [jsx(), vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            // vue: "vue/dist/vue.esm-bundler.js",
        },
    },
})
