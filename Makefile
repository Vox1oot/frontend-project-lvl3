run:
	bin/nodejs-package.js 10

install:
	npm ci

#test:
#	npx jest 

#test-coverage:
#	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

build:
	rm -rf dist
	NODE_ENV=production npx webpack

server:
	npx webpack serve