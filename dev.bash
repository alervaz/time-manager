#!/bin/zsh

air & npm run build & npx tailwindcss -i ./src/style.css -o ./styles/style.css --watch & fg
