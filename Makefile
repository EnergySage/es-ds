.PHONY: install
install:
	npx lerna exec -- npm install
	npx lerna bootstrap
	npm --prefix es-vue-base run build
.PHONY: dev
dev:
	overmind s
.PHONY: test
test:
	npx lerna run test

.PHONY: build
build:
	npx lerna run build

.PHONY: publish
publish:
	npx lerna publish

.PHONY: update
update:
	npm --prefix es-vue-base run build
	npx lerna bootstrap
