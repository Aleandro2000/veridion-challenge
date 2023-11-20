<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="referrer" content="no-referrer-when-downgrade">

        <title>Veridion Challenge</title>

        @viteReactRefresh
        @vite('resources/css/app.css')
        @vite('resources/js/app.js')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
