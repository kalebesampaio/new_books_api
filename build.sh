#!/usr/bin/env bash
# exit on error
set -o errexit

npm i
npm i --save-dev @types/express
npm run build
npm run typeorm migration:run -d dist/data-source
