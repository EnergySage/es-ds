# Run local v3 docs site with hot reloading hooked up to es-bs-base and es-ds-components

.PHONY: dev
dev:
	cd es-bs-base; npm link
	cd es-ds-components; npm link
	cd es-ds-docs; npm link @energysage/es-bs-base @energysage/es-ds-components
	cd es-ds-docs; npm run dev

# Run the old v2 docs site with slow rebuilds of es-bs-base and es-vue-base

.PHONY: legacy-dev
legacy-dev:
	overmind s

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
	npm --prefix es-bs-base install
	npm --prefix es-ds-components install
	npm --prefix es-ds-docs install
	(cd es-ds-components && npx nuxt build)

.PHONY: legacy-install
legacy-install:
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
