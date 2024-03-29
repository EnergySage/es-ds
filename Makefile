.PHONY: dev
dev:
	overmind s

.PHONY: lint
lint:
	npx lerna run lint

.PHONY: test
test:
	npx lerna run test

.PHONY: build
build:
	npx lerna run build

.PHONY: publish
publish:
	npx lerna publish

.PHONY: symlink
symlink:
	npx lerna bootstrap

.PHONE: reload
reload:
	npm --prefix es-vue-base run build
	npx lerna bootstrap

# Sometimes Called

.PHONY: install
install:
	npm install
	npx lerna exec -- npm install

# Bootstraping Commands (not reguarly called)

.PHONY: build-scss-pkg
build-scss-pkg:
	npm run --prefix es-bs-base build

.PHONY: build-vue-pkg
build-vue-pkg:
	npm run --prefix es-vue-base build

.PHONY: update-peer-deps
update-peer-deps:
	npm --prefix es-vue-base install bootstrap-vue@2 \
		vue@2
