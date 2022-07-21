.PHONY: dev
dev:
	npm --prefix es-design-system run dev

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
	lerna bootstrap
