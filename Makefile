.PHONY: dev
dev:
	overmind s

.PHONY: install
install:
	npm install
	npx lerna exec -- npm install

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

.PHONY: update
update:
	npx lerna bootstrap

.PHONE: reload
reload:
	npm --prefix es-vue-base run build
	npx lerna bootstrap

# Bootstraping Commands (not reguarly called)

.PHONY: build-scss-pkg
build-scss-pkg:
	npm run --prefix es-bs-base build

.PHONY: build-vue-pkg
build-vue-pkg:
	npm run --prefix es-vue-base build

.PHONY: update-peer-deps
update-peer-deps:
	npm --prefix es-vue-base install bootstrap-vue@^2.22.0 \
		vue@^2.7.8 \
