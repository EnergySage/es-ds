# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.16.1] - 2023-02-23

### Added

- Added `eyebrow` class and updated typography documentation

### Fixed

- Fixed an issue where using nuxt module did not include `style` blocks from components

### Changed

- ***BREAKING CHANGE***: Text is now centered in buttons by default
- ***BREAKING CHANGE***: `h4` and `h5` font size is now 1rem(16px)

## [0.16.0] - 2023-02-20

### Added

- `@energysage/es-vue-base/nuxt` module is now availble for opt-in use; [usage docs](./es-design-system/pages/examples/nuxt-components.vue)

### Fixed

- `EsSlider` where change event triggered twice; introduced in `0.14.0`
- `EsFormRadioCards` where value was not defined as a prop; introduced in `0.15.0`
- `EsFormTextArea` where hasMessage was undefined; introduced in `0.13.0`
- `es-form-radio-cards` documentation updated to fix mobile layout
- `es-form-msg` documentation updated to fix typo

### Changed

- ***BREAKING:*** All icon files and exports have been renamed to include `icon-` prefix
- Updated favicon files and configurations
- Removed aliases in `es-vue-base`, bundles work better with relative paths

## [0.15.1] - 2023-02-08

### Added

- `EsFormRadioCards` and `EsFormRadioCard` components
- `font-size-h{1-6}` utility classes that match responsive header font sizing for mobile and desktop.
- `line-height-base` utility class

### Fixed

- ***BREAKING:*** The `font-size-{xx}` utility classes now use `!important` and may therefore override local styles where they weren't before.

## [0.15.0] - 2023-02-06

### Added

- Min width utility class based on `em` units have been added (e.g. `min-width-6`).
- Auto width utility classes for each breakpoint have been added (e.g. `w-lg-auto`).
- A new example page for Form Level Validation (including a loading spinner) has been added.

### Changed

- ***BREAKING:*** Changed the `secondary` color/variant to `#292929` (from `#007AAB`) to distinguish from primary and better match designs.
- ***BREAKING:*** `EsButton` now has a fixed height; default/large buttons are `48px` tall, small buttons are `28px` tall.
- ***BREAKING:*** `EsButton` default/large button horizontal padding has increased to `24px` from `16px`
- `EsButton` also received a number of non-breaking updates:
  - *Large and default sizes are now the same:* The `lg` button size is now no different from the default size. `lg` is not deprecated, but we recommend using the default size instead (fewer props to pass in).
  - *Automatic vertical centering:* Text, icons, and other button content will now automatically be vertically centered relative to each other.
  - *Text size:* Button font size is now `16px` regardless of button size (small, default, large). Previously, depending on ESDS version, large button font size was either `18px` or `20px`.
  - *Border radius:* All buttons now have a border radius of `8px`.
  - *Hover, active, and focus states:* Background colors of both primary and secondary buttons in these states have been updated. Buttons will also now have a slight border when given focus in supporting browsers.
  - *Disabled text color:* The text color of disabled buttons has changed to `#565656` instead of `#292929`.
- The `EsButton` documentation page no longer includes a large button example.
- The `EsButton` documentation page now has examples of buttons with text, text and an icon, and icon only.
- The `EsButton` documentation page now displays a list of deprecated button styles for reference.

### Deprecated

- The `dark` variant of `EsButton` is now deprecated in favor of `secondary` and will be removed in a future version.
- The following variants of `EsButton` are also deprecated and will be removed in a future version: `success`, `info`, `warning`, `danger`, `light`, `mid`, `mid-dark`, `highlight`, and `highlight-dark`.

### Removed

- Removed some unnecessary VS Code recommendations for Django and Python.

## [0.14.1] - 2023-01-27

### Changed

- ***BREAKING:*** Added `optimizeSSR` to `es-vue-base` `esm` bundle

## [0.14.0] - 2023-01-26

### Changed

- ***BREAKING:*** Updated `EsSlider.vue` to be client only; does not support SSR
- ***BREAKING:*** Updated `es-vue-base/build/rollup.config.js` to optimize for SSR
  - This will break jest unit tests if you are using `mount` and not `shallowMount`. To fix it update your `jest.config.js` with the following:

  ```javascript
        module.exports = {
            moduleNameMapper: {
                '^@energysage/es-vue-base$': '@energysage/es-vue-base/dist/es-vue-base.umd.js',
            }
        };
  ```

## [0.13.3] - 2023-01-23

### Added

- Added `EsProgress` component and documentation

### Changed

- Updated `eslint-config-energysage` and fixed new rules
- Fixed an issue where `EsRating` background was always `white`

## [0.13.2] - 2023-01-23

### Changed

- Fixed an issue where defaulting a date to today's date in `EsReview` caused Jest to fail
- Fixed `EsReview` display so it only shows dates that get passed in
- Fixed `EsReview` display to account for no developer logo
- Fixed a regression in `bg-{color}` classes; should use `!important;`

## [0.13.1] - 2023-01-11

### Changed

- `EsReview` and `EsReviewModal` now account for updates and developer responses to reviews
- Bumped all out of date `npm` packages
- Created responsive breakpoint [documentation](https://dev.design.energysage.dev/0.13.1/atoms/layout)

## [0.13.0] - 2022-12-14

### Added

- Examples section to the documentation
- Additional methods to the form validation mixin

### Changed

- ***Breaking:*** Form validation feedback now include icons, and only an error state results in a change of border-color on input fields.

## [0.12.0] - 2022-12-09

### Changed

- ***BREAKING:*** `EsReview` now does not contain padding or margins; responsibility of wrapping element
- ***BREAKING:*** `bg-white` utility class no longer has an `!important` property
- Fixed an issue where `EsVerificationCode` emits triggered too quickly
- Removed `EsHorizontalList` from `es-review-list` documentation in favor of row and column display

### Added

- Added `size` prop to `EsVerificationCode`; defaults to `lg` which was current display
- Added `bg-{COLOR}` and `text-{COLOR}` utility classes
- Bumped all major npm dependencies

## [0.11.3] - 2022-11-29

### Changed

- Fixed an issue where emits in `EsVerificationCode` sometimes triggered twice on paste

## [0.11.2] - 2022-11-29

### Changed

- Fixed an issue where emits in `EsVerificationCode` sometimes triggered twice

## [0.11.1] - 2022-11-28

### Changed

- Added `Function` support to `marks` prop in `EsSlider`
- Updated style in `EsSlider` to support 5 character length

## [0.11.0] - 2022-11-28

### Changed

- ***BREAKING:*** `EsVerificationCode` now expects and returns an array using `v-model`

### Added

- `EsAccordion` and `EsAccordionList` components
- favicon supporting files
- Prism code highlighter and source documentation to all components

## [0.10.0] - 2022-11-16

### Added

- Add `fort-size-*` utility classes
- Exposing vuelidate `helpers` utility as `vuelidateHelpers`

### Changed

- ***BREAKING:*** `validateState` no longer assumes data is nested within a `form` object.
- Update github templates for pull-requests and issues
- Updates to documentation

## [0.9.0] - 2022-11-11

### Added

- validations to `formMixins` to support password validation requirements in flash

### Changed

- ***BREAKING CHANGE: Updated header font sizes and added mobile responsiveness***
  - Applications will need to update and regression test headers in desktop and mobile
- Updated all major npm dependencies

## [0.8.0] - 2022-11-3

### Added

- `tel` type to `EsFormInput`

### Changed

- ***BREAKING CHANGE: `font-weight-bolder` is now `700`***
  - Applications will need to update their google font import to include this new font weight
- `$body-color` to `$gray-800`

## [0.7.7] - 2022-10-26

### Fixed

- Issue with `EsVerificationCode` and pasting order characters showed up
- Issue where outlined buttons didn't show disabled state
- Issue where breadcrumb bg was always `$white`

### Added

- new slot `extraContext` to `EsFormInput`
- missing icons to package and docs

## [0.7.6] - 2022-10-10

### Fixed

- Issue with `EsVerificationCode` and pasting in Safari + Chrome

### Changed

- all major npm dependencies

## [0.7.5] - 2022-10-10

### Changed

- `EsVerificationCode` to allow `0`

## [0.7.4] - 2022-10-10

### Added

- `EsVerificationCode` component

## [0.7.3] - 2022-10-04

### Changed

- Replace `color-adjust` with `print-color-adjust`

## [0.7.2] - 2022-10-04

### Fixed

- Fixed issue where all font weights weren't pulled into `es-design-system`

### Added

- `semibold` scss variable
- font weight documentation to Typography

### Changed

- Updated npm packages to latest versions

## [0.7.1] - 2022-09-27

### Added

- prop(default `true` to round to nearest `0.5` to `EsRating`

## [0.7.0] - 2022-09-26

### Added

- color scales for `yellow|teal|pink|cyan` to `es-bs-base`
- `cool|warm` variants to `EsSupport`

### Changed

- color docs to support above to `es-design-system`
- documentation around getting started and publishing
- `ci.yml` to include build and symlink steps

## [0.6.7] - 2022-09-20

### Fixed

- issue with `v-model` in `EsFormInput` && `EsFormTextarea`

## [0.6.6] - 2022-09-19

### Fixed

- import issues in `es-design-system` with `bootstrap-vue`
- Bug fixes and improvements to `EsReview` and `EsReviewModal`

### Added

- Added sidebar and breadcrumbs to `es-design-system`

### Changed

- Disabled `box-shadow` in `es-bs-base`
- Upgraded to `node@16`

## [0.6.2] - 2022-09-14

### Fixed

- issue where babel was not transpiling esm package correctly

### Changed

- Specified `*` for peer dependency `es-bs-base` in `es-vue-base`

## [0.6.0] - 2022-09-14

### Changed

- Update all dependencies to highest possible versions

## [0.5.6] - 2022-09-12

### Added

- updated comment to EsReview

### Changed

- Remove image from EsSupport; BREAKING CHANGE
- Make tabs default to border true & fix wrong border color
- EsButton design updates based on feedback
- Increase badge padding

## [0.5.2] - 2022-08-17

### Fixed

- issue with EsReview showing horizontal scroll on desktop

### Changed

- Updated eslint-config-energysage
- Added back dupe vue check to es-design-system

### Removed

- remaining es-bs-base references
- border radius from bs4 dropdown menus

## [0.5.0] - 2022-08-16

### Added

- move additions into `es-bs-base`

### Removed

- Remove `npm --prefix es-vue-base run build` from `make update`
- Remove `es-bs-extends`

### Changed

- Fix snapshot test by passing in date as a argument
- Turn off formatOnSave setting, until formatting issues are resolved

## 0.4.38

### Added

- Add `PULL_REQUEST_TEMPLATE.md`
- Added `ESReview` *organism* component
- Added `EsForm` *organism* component
- Added `EsFormMsg` *molecule* component
- Added `EsReviewModal` *molecule* component
- Added `forms` mixin
- Added form validation functions

### Removed

- Remove `EsReview` *molecule* component

### Changed

- Tweaks to some variables, mainly typography in consultation with design team
- Fix package.json files to point to mono-repo
- Deprecated repos for each part of the design system
- Tweak design system documentation to build from nuxt
- Tweaks to `EsButton` *molecule* component
- Tweaks to `EsCollapse` *molecule* component
- Tweaks to `EsHorizontalList` *molecule* component
- Tweaks to `EsModal` *molecule* component
- Tweaks to `EsPopover` *molecule* component
- Tweaks to `EsSupport` *molecule* component
- Tweaks to `EsBadge` *molecule* component
- Tweaks to `EsBreadcrumbs` *molecule* component
- Tweaks to `EsFormInput` *molecule* component
- Tweaks to `EsFormTextarea` *molecule* component
- Tweaks to `EsRating` *molecule* component
- Tweaks to `EsSlider` *molecule* component
- Tweaks to `EsTabs` *molecule* component
- Tweaks to `EsCollapse

[0.15.1]: https://github.com/EnergySage/es-ds/compare/v0.15.0...v0.15.1
[0.15.0]: https://github.com/EnergySage/es-ds/compare/v0.14.1...v0.15.0
[0.14.1]: https://github.com/EnergySage/es-ds/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/EnergySage/es-ds/compare/v0.13.3...v0.14.0
[0.13.3]: https://github.com/EnergySage/es-ds/compare/v0.13.2...v0.13.3
[0.13.2]: https://github.com/EnergySage/es-ds/compare/v0.13.1...v0.13.2
[0.13.1]: https://github.com/EnergySage/es-ds/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/EnergySage/es-ds/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/EnergySage/es-ds/compare/v0.11.3...v0.12.0
[0.11.3]: https://github.com/EnergySage/es-ds/compare/v0.11.2...v0.11.3
[0.11.2]: https://github.com/EnergySage/es-ds/compare/v0.11.1...v0.11.2
[0.11.1]: https://github.com/EnergySage/es-ds/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/EnergySage/es-ds/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/EnergySage/es-ds/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/EnergySage/es-ds/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/EnergySage/es-ds/compare/v0.7.7...v0.8.0
[0.7.7]: https://github.com/EnergySage/es-ds/compare/v0.7.6...v0.7.7
[0.7.6]: https://github.com/EnergySage/es-ds/compare/v0.7.5...v0.7.6
[0.7.5]: https://github.com/EnergySage/es-ds/compare/v0.7.4...v0.7.5
[0.7.4]: https://github.com/EnergySage/es-ds/compare/v0.7.3...v0.7.4
[0.7.3]: https://github.com/EnergySage/es-ds/compare/v0.7.2...v0.7.3
[0.7.2]: https://github.com/EnergySage/es-ds/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/EnergySage/es-ds/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/EnergySage/es-ds/compare/v0.6.7...v0.7.0
[0.6.7]: https://github.com/EnergySage/es-ds/compare/v0.6.6...v0.6.7
[0.6.6]: https://github.com/EnergySage/es-ds/compare/v0.6.2...v0.6.6
[0.6.2]: https://github.com/EnergySage/es-ds/compare/v0.6.0...v0.6.2
[0.6.0]: https://github.com/EnergySage/es-ds/compare/v0.5.6...v0.6.0
[0.5.6]: https://github.com/EnergySage/es-ds/compare/v0.5.2...v0.5.6
[0.5.2]: https://github.com/EnergySage/es-ds/compare/v0.5.0...v0.5.2
[0.5.0]: https://github.com/EnergySage/es-ds/compare/v0.4.38...v0.5.0
