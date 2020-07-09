#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://colinsprojects.github.io
# git push -f git@github.com:https://colinsprojects.github.io//colinsprojects.github.io.git master

# if you are deploying to https://colinsprojects.github.io/https://colinsprojects.github.io/
# git push -f git@github.com:colinsprojects/https://colinsprojects.github.io/.git master:gh-pages

cd -