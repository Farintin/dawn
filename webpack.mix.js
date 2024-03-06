// webpack.mix.js

let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss')

mix
    .js('src/js/aipine.js', 'assets')
    .js('src/js/beauty-header.js', 'assets')

    .sass('src/scss/tailwind.scss', 'assets')
    .sass('src/scss/beauty-theme-variables.scss', 'assets')
    .sass('src/scss/beauty-theme-global.scss', 'assets')
    .sass('src/scss/beauty-theme-style.scss', 'assets')
    .sass('src/scss/beauty-theme-base.scss', 'assets')
    .sass('src/scss/beauty-header.scss', 'assets')

    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('tailwind.config.js') ]
    })