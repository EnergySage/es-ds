.PHONY: dev
dev:
	npm --prefix es-design-system run dev

.PHONY: test
test:
	npx lerna run test

# .PHONY: test
# test:
# 	npm --prefix es-design-system run test

.PHONY: build
build:
	npx lerna run build

# npm --prefix es-vue-base run build

.PHONY: publish
publish:
	npx lerna publish

.PHONY: update
update:
	lerna bootstrap
