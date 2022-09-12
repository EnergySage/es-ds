# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.6] - 2022-08-17

- Remove image from EsSupport; BREAKING CHANGE
- Make tabs default to border true & fix wrong border color
- Added updated comment to EsReview
- EsButton design updates based on feedback
- Increase badge padding

## [0.5.2] - 2022-08-17

- Fixed an issue with EsReview showing horizontal scroll on desktop
- Updated eslint-config-energysage
- Added back dupe vue check to es-design-system
- Removed remaining es-bs-base references
- Removed border radius from bs4 dropdown menus

## [0.5.0] - 2022-08-16

### Added

- move additions into `es-bs-base`

### Removed

- Remove `npm --prefix es-vue-base run build` from `make update`
- Remove `es-bs-extends`

### Changed

- Fix snapshot test by passing in date as a argument
- Turn off formatOnSave setting, until formatting issues are resolved

## [0.4.38]

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

## Changed

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

[Unreleased]: https://github.com/EnergySage/es-ds/compare/v0.5.0...main
[0.5.0]: https://github.com/EnergySage/es-ds/compare/v0.4.38...v0.5.0
