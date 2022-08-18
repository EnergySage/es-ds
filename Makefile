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
	npx lerna bootstrap

# Bootstraping Commands (not reguarly called)

.PHONY: build-scss-pkg
build-scss-pkg:
	npm --prefix es-bs-base build

.PHONY: update-peer-deps
update-peer-deps:
	npm --prefix es-vue-base install bootstrap-vue@^2.22.0 \
		html-truncate@^1.2.2 \
		vue@^2.7.8 \
		vue-slider-component@^3.2.18 \
		vuelidate@^0.7.7
