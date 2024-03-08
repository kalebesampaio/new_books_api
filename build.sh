#!/usr/bin/env bash
# exit on error
set -o errexit

npm i
npm install @types/d3 --save-dev
npm run build
npm run typeorm migration:run -d dist/data-source
