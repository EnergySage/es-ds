# Run local v3 docs site with hot reloading hooked up to es-ds-styles and es-ds-components

.PHONY: dev
dev: symlink
	cd es-ds-docs; npm run dev

.PHONY: symlink
symlink:
	cd es-ds-styles; npm link
	cd es-ds-components; npm link @energysage/es-ds-styles; npm link
	cd es-ds-docs; npm link @energysage/es-ds-styles @energysage/es-ds-components

# Unlink local v3 docs site from local es-ds-styles and es-ds-components; restore to NPM versions

.PHONY: unlink
unlink:
	cd es-ds-styles; npm unlink @energysage/es-ds-styles
	cd es-ds-components; npm unlink @energysage/es-ds-components
	cd es-ds-docs; npm unlink --no-save @energysage/es-ds-styles
	cd es-ds-docs; npm unlink --no-save @energysage/es-ds-components
	cd es-ds-docs npm install

.PHONY: lint
lint:
	npm --prefix es-ds-styles run lint
# TODO: set up linting for es-ds-components and es-ds-docs
# 	npm --prefix es-ds-components run lint
# 	npm --prefix es-ds-docs run lint

.PHONY: test
test:
	npm --prefix es-ds-styles run test
# TODO: set up testing for es-ds-components and es-ds-docs
#	npm --prefix es-ds-components run test
#	npm --prefix es-ds-docs run test

.PHONY: build
build:
	npm --prefix es-ds-styles run build
	npm --prefix es-ds-docs run build
# es-ds-components does not have a build step

.PHONY: publish
publish:
	cd es-ds-styles; npm publish
	cd es-ds-components; npm publish

# Sometimes Called

.PHONY: install
install:
	npm --prefix es-ds-styles install
	npm --prefix es-ds-components install
	npm --prefix es-ds-docs install

# Bootstraping Commands (not reguarly called)

.PHONY: update-package-deps
update-package-deps:
	cd es-ds-components; npm uninstall @energysage/es-ds-styles && npm install @energysage/es-ds-styles
	cd es-ds-docs; npm uninstall @energysage/es-ds-styles && npm install @energysage/es-ds-styles && npm uninstall @energysage/es-ds-components && npm install @energysage/es-ds-components
