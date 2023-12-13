lint:
	npx eslint frontend/src

install:
	npm ci

build:
	npm run build

deploy:
	git push heroku main

start:
	npm start