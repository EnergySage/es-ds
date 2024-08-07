# Run local v3 docs site with hot reloading hooked up to es-bs-base and es-ds-components

.PHONY: dev
dev: symlink
	cd es-ds-docs; npm run dev

# Run the old v2 docs site with slow rebuilds of es-bs-base and es-vue-base

.PHONY: legacy-dev
legacy-dev:
	overmind s

.PHONY: symlink
symlink:
	cd es-bs-base; npm link
	cd es-ds-components; npm link
	cd es-ds-docs; npm link @energysage/es-bs-base @energysage/es-ds-components

# Unlink local v3 docs site from local es-bs-base and es-ds-components; restore to NPM versions

.PHONY: unlink
unlink:
	cd es-bs-base; npm unlink @energysage/es-bs-base
	cd es-ds-components; npm unlink @energysage/es-ds-components
	cd es-ds-docs; npm unlink --no-save @energysage/es-bs-base
	cd es-ds-docs; npm unlink --no-save @energysage/es-ds-components
	cd es-ds-docs npm install

.PHONY: lint
lint:
	npm --prefix es-bs-base run lint
# TODO: set up linting for es-ds-components and es-ds-docs
# 	npm --prefix es-ds-components run lint
# 	npm --prefix es-ds-docs run lint

.PHONY: legacy-lint
legacy-lint:
	npx lerna run lint

.PHONY: test
test:
	npm --prefix es-bs-base run test
# TODO: set up testing for es-ds-components and es-ds-docs
#	npm --prefix es-ds-components run test
#	npm --prefix es-ds-docs run test

.PHONY: legacy-test
legacy-test:
	npx lerna run test

.PHONY: build
build:
	npm --prefix es-bs-base run build
	npm --prefix es-ds-docs run build
# es-ds-components does not have a build step

.PHONY: legacy-build
legacy-build:
	npx lerna run build

.PHONY: publish
publish:
	npm --prefix es-bs-base run publish
	npm --prefix es-ds-components run publish

.PHONY: legacy-publish
legacy-publish:
	npx lerna publish

.PHONY: legacy-symlink
legacy-symlink:
	npx lerna bootstrap

.PHONE: legacy-reload
legacy-reload:
	npm --prefix es-vue-base run build
	npx lerna bootstrap

# Sometimes Called

.PHONY: install
install:
	npm --prefix es-bs-base install
	npm --prefix es-ds-components install
	npm --prefix es-ds-docs install

.PHONY: legacy-install
legacy-install:
	npm install
	npx lerna exec -- npm install

# Bootstraping Commands (not reguarly called)

.PHONY: legacy-build-scss-pkg
legacy-build-scss-pkg:
	npm run --prefix es-bs-base build

.PHONY: legacy-build-vue-pkg
legacy-build-vue-pkg:
	npm run --prefix es-vue-base build

.PHONY: legacy-update-peer-deps
legacy-update-peer-deps:
	npm --prefix es-vue-base install bootstrap-vue@2 \
		vue@2
