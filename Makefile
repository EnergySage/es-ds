.PHONY: dev
dev:
	npm --prefix es-design-system run dev

.PHONY: update
update:
	lerna bootstrap

.PHONY: build-vue
build-vue:
	npm --prefix es-vue-base run build

.PHONY: storybook
storybook:
	npm --prefix es-design-system run storybook

.PHONY: test
test:
	npm --prefix es-design-system run test
