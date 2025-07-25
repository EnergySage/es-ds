_**Note: This file is no longer being updated as a result of the adoption of release-please.
Instead, the changelogs within each package are being updated automatically by release-please.
See the changelogs for [es-ds-styles](./es-ds-styles/CHANGELOG.md), 
[es-ds-components](./es-ds-components/CHANGELOG.md), and 
[es-ds-docs](./es-ds-docs/CHANGELOG.md).**_

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 3.2.3 - 2025-07-10

- Fixed a type error within EsProgress

## 3.2.2 - 2025-07-10

- Fixed an accessibility issue with EsModal where focus would not be given to the modal when opened if the `closeable` prop was set to false

## 3.2.1 - 2025-07-09

- Fixed a visual bug with EsProgress where the circle appeared much larger than intended
- Reduced the border of the EsButton outline variant from 2px to 1px
- Brought EsButton focus outline states into compliance with WCAG accessibility guidelines
- EsButton focus outlines will now only appear when tabbing via keyboard, not when clicking/tapping
- Simplified the EsButton docs page
- Added a CLAUDE.md file

## 3.2.0 - 2025-07-08

- ***BREAKING CHANGE:*** EsProgress has updated styling and new props `formatter`, `showCircle`, and `valueClass`

## 3.1.7 - 2025-06-13

- Made it possible for file picker to restrict to a single file

## 3.1.6 - 2025-06-06

- Upgraded dependencies, including Nuxt (3.15 to 3.17)

## 3.1.5 - 2025-05-13

- Added `sideImage` slot, `sideImageContainerClass` prop, and `semi-wide` variant to EsCtaBanner

## 3.1.4 - 2025-05-01

- Fixed an issue with IconFacebook where it didn't resize based on the height and width props passed to it

## 3.1.3 - 2025-04-30

- Added `closable` and `showFooterSeparator` props to EsModal
- The EsModal header will now automatically hide if the modal title slot is not provided

## 3.1.2 - 2025-04-30

- Added social icons for Bluesky and Threads
- Improved the layout of EsPopover so the content can go full width and wrap around the close button
- Deprecated the `cta` slot of EsPopover as it's no longer needed to go full width
- Fixed an issue with EsCollapse where it didn't have a visible focus outline when tabbed to via keyboard

## 3.1.1 - 2025-04-21

- Fixed an issue with IconTwitter where the inner part of the X was forced to be white instead of the icon color

## 3.1.0 - 2025-04-17

- ***BREAKING CHANGE:*** The `target` and `triggers` props of EsPopover have been removed and a `trigger` slot is now available
- EsPopover is now based on [Reka UI Popover](https://reka-ui.com/docs/components/popover) instead of [PrimeVue OverlayPanel](https://v3.primevue.org/overlaypanel/)
- A new EsTooltip component has been added based on [Reka UI Tooltip](https://reka-ui.com/docs/components/tooltip), that will fall back to the EsPopover implementation on touch devices
- Fixed an issue where EsPopover was not accessible by screen readers or keyboard
- Fixed an issue where EsPopover positioning was incorrect if the triggering element was too close to the right edge of the viewport
- EsPopover now supports left, right, top, and bottom positioning relative to the trigger button
- EsPopover background color has been updated from black to dark blue
- EsPopover arrow is now rounded
- EsPopover can now accept a `cta` slot to enable a link or button to appear full width within the popover
- EsPopover will now automatically flip to the opposite side of the triggering element automatically while the popover is open if a scroll or other movement collides with the viewport edge
- EsPopover can now have a collision padding set so it will flip a certain amount of pixels prior to reaching the viewport edge (e.g. in case of a sticky nav bar)
- Added Tooltip within the list of components referenced on the Corners docs page
- Removed the old, now-unused popover styles from es-ds-styles

## 3.0.11 - 2025-04-17

- Fixed an issue with EsTabs where it would fail to render if a code comment was a child of EsTabs
- Fixed an issue where screen readers would announce an incorrect header for the EsCollapse toggle
- Fixed an issue with EsVideo where it would reject a YouTube embed URL if it contained an underscore

## 3.0.10 - 2025-04-10

- The `dark` prop on EsCtaBanner is now deprecated in favor of a new `background` prop
- Added a new stacked `variant` of EsCtaBanner

## 3.0.9 - 2025-04-04

- Fixed an issue in EsCard where root-relative links were treated as internal links, breaking navigation to links outside the same Nuxt app

## 3.0.8 - 2025-03-07

- Removed EsNavBar and EsFooter as they are now hosted elsewhere

## 3.0.7 - 2025-03-06

- Fixed an issue in EsCollapse where if the heading contained more than one element, the layout would break

## 3.0.6 - 2025-03-05

- Fixed an issue in EsNavBar where the mobile Solar Calculator link was not a link

## 3.0.5 - 2025-02-26

- Fixed an issue in EsZipCodeForm where the context message would sometimes not be aligned left
- Fixed one moderate security vulnerability via dependency updates

## 3.0.4 - 2025-02-20

- Added a new `contextMessage` prop to EsZipCodeForm
- Fixed an accessibility issue with EsCollapse by adding descriptive text to its expand/collapse button

## 3.0.3 - 2025-02-18

- Fix a mobile issue in EsAccordion where the expand animation would sometimes not animate to the full height of the content
- Fixed an issue when running the local es-ds-docs server where sometimes an `EMFILE: too many open files, watch` error would crash the server
- Updated the version and config of eslint in es-ds-components and es-ds-docs
- Fixed four moderate security vulnerabilities via dependency updates

## [3.0.2] - 2025-02-14

- Fixed an issue in EsVideo where the video would fail to play sometimes
- Temporarily removed "Your privacy choices" link in EsFooter

## [3.0.1] - 2025-02-07

- Fix hydration error in EsErrorPage

## [3.0.0] - 2025-02-05

- Update to Vue/Nuxt 3. This is a big change; see [documentation in Confluence](https://energysage.atlassian.net/wiki/spaces/DS/pages/1489174627/Changelog+from+ESDS+v2+to+v3).

## [2.1.0] - 2024-07-24

### Added

- Added `EsDataTableSimple` component and documentation

## [2.0.6] - 2024-06-18

### Changed

- Added Alaska and Hawaii state graphics as icons
- Added restricted chart colors to the Colors docs page

## [2.0.5] - 2024-06-17

### Changed

- Temporarily revert `EsVideo` default to muted
- Remove the "Help center" link from `EsFooter`

## [2.0.4] - 2024-06-13

### Changed

- One-line text in `EsPopover` is now vertically centered
- `EsVideo` now starts the video off muted to allow autoplay

## [2.0.3] - 2024-06-13

### Changed

- Fixed `EsZipCodeForm` centering issue
- Article images in `EsNavBar` now have rounded corners

## [2.0.2] - 2024-06-13

### Changed

- ***BREAKING CHANGE:*** Renamed the `zipCodeInitialValue` prop of `EsZipCodeForm` to `zipCodeValue`
- The `zipCodeValue` prop of `EsZipCodeForm` is now watched for updates, that will flow through to the zip code input

## [2.0.1] - 2024-06-12

### Changed

- Removed duplicate "News" link from `EsNavBar`

## [2.0.0] - 2024-06-11

### Added

- New color names
- New 400 (64px), 500 (80px), and 600 (96px) classes
- *Checkbox* to design-system

### Changed

- Border radii have changed from S / 4, M / 8, L / 12 to XS / 4, S / 8, M / 12, L / 16
- 450 (72px) is officially deprecated in favor of 400 (64px) or 500 (80px)
- Changed base font from "Inter" to "Plus Jakarta Sans"
- Base font weight is now 400 instead of 300
- Heading font weight is now 600 instead of 500
- Link hover color is now the same as non-hover
- List item bottom margin is now 8px instead of 0px
- *Accordion* expand/collapse buttons on the default variant now have a hover color
- *Accordion* on the default variant now have a border
- *Accordion* bottom corners of the default variant are no longer rounded
- *Accordion* background color and font color of default variant has been updated
- *Badge* Updated background and font colors
- *Badge* Horizontal padding is now 16px instead of 5.6px
- *Badge* Border radius is now 16px instead of 11.2px
- *Badge* Removed hover/focus state as badges are not clickable/focusable
- *Breadcrumbs* Padding between items is now 8px instead of 4px
- *Breadcrumbs* Bottom margin is now 16px instead of 0px for standardized spacing
- *Button* Updated look of the primary variant and its outline state
- *Button* Primary variant now has a light-colored shadow that makes it unsuitable for use on dark backgrounds
- *Button* The secondary variant is now identical to primary
- *Button* new dark-bg variant, along with an outline version, for use on dark backgrounds
- *Button* Button font weight is now 700 instead of 600
- *Button* Height of small buttons is now 40px instead of 28px
- *Button* Font size in small buttons is now 14px instead of 16px
- *Button* Updated default spinner styling
- *Button* Added examples of loading spinners within buttons
- *Card* Display cards no longer have a shadow and now have a 2px gray border
- *Card* Interactive cards now have a shadow and a thicker 2px gray border
- *Card* Interactive cards will now render as `<button>` tags by default, unless an href is provided, in which case they will render as `<b-link>`, unless a specific tag name is provided, in which case the provided tag will be used
- *Card* Default padding is now 24px instead of 32px
- *Card* Defined focus and active states, rather than allowing the default blue browser outline to appear
- *Checkbox* Updated colors, check mark icon, padding, hover/focus/active/disabled states
- *Data Table* Updated background and text colors
- *Data Table* Horizontal cell padding is now 16px instead of 12px
- *Data Table* Table now always has rounded corners
- *Data Table* Removed rounded prop
- *Error page* displays descriptive error phrases instead of error codes
- *Error page* background color is now Gray 50 instead of transparent
- *Horizontal list* Updated colors
- *Horizontal list* Chevron buttons are now closer to the dots
- *Modal* footer now has 32px padding and a top border
- *Modal* close button icon is now 32px in size instead of 26px
- *Modal* close button is now Gray 900 instead of a 50% transparent Gray 900
- *Pagination* Updated colors
- *Pagination* Each button now has sufficient size to meet accessibility tap target size criteria
- *Pagination* Chevron arrows are further from the page numbers on mobile
- *Radio button* Added docs page for radio button
- *Radio button* Updated colors, checked circle icon, padding, hover/focus/active/disabled states
- *Rating* Updated star icons with more rounded corners, half stars have white infill
- *Rating* Stars are now orange
- *Support* Margin between photo and text is now 8px instead of 16px
- *Support Card* Photo will now be on top of the card on mobile
- *Support Card* Paragraph will now have a max width on large desktop to prevent line length from getting too long
- *Tabs* Updated colors and padding
- *Textarea* visual updates
- *Text input* Height is now 56px instead of 50px
- *Text input* Border radius is now 4px instead of 8px
- *Text input* Bottom margin is now 16px instead of 8px
- *Text input* Labels are now italicized
- *Text input* Focus state border color has changed
- *Text input* The check icon on input success state has been removed
- *Video* Now uses EsCard interactive variant instead of EsButton
- *View more* Spacing between text and "View more" link is now 8px instead of 4px
- *View more* Corrected case of default text to be sentence case instead of title case

## [1.3.9] - 2024-05-20

### Changed

- Removed the "Done shopping" link from logged-in account menu in `EsNavBar`
- Removed old collapse unit tests in es-bs-base
- Added a faster reloads hack for local development

## [1.3.8] - 2024-04-26

### Changed

- `EsZipCodeForm` now accepts a new `zipCodeInitialValue` prop that sets the initial value of the field

## [1.3.7] - 2024-04-26

### Changed

- Updated several links in the logged-in account menu in `EsNavBar`

## [1.3.6] - 2024-04-19

### Changed

- Updated the "Get personalized quotes" link under "Heating & cooling" in `EsNavBar`

## [1.3.5] - 2024-04-19

### Changed

- Updated the EnergySage intel report link under About Us in `EsNavBar`

## [1.3.2] - 2024-04-03

### Changed

- Added new nav links

## [1.3.1] - 2024-04-01

### Changed

- EsZipCodeForm accepts selectedProduct query param

## [1.3.0] - 2024-03-15

- Added some icons for the landing links

## [1.2.1] - 2024-03-13

### Changed

- Replaced one link with another under "EV chargers" menu in `EsNavBar`
- Added catalog-info.yaml and mkdocs.yml files to support Backstage integration

## [1.2.0] - 2024-02-19

## Changes

- Moved `EsDataTable` styles from the Vue component into the SASS files of es-bs-base

## [1.1.13] - 2024-02-15

### Changed

- Updated to Node 18 and performed other "safe" dependency updates

## [1.1.12] - 2024-02-15

### Changed

- `IconTwitter` has been changed from the bird logo to the new X logo
- `EsFooter` link for Twitter has been changed from twitter.com to x.com
- Corrected typo in `EsFooter` Department of Energy link

## [1.1.11] - 2024-02-07

### Changed

- Remove Spaces from File Names from `ESFileInput`

## [1.1.10] - 2023-12-8

### Changed

- Improved the phone number capture with a `maskedTel` option that gives the user guidance

## [1.1.9] - 2023-11-17

### Changed

- Fixed an accessibility issue in `EsAccordion` with improper configuration of aria attributes

## [1.1.8] - 2023-11-03

### Changed

- Fixed an issue in `EsNavBar` where the "Sign in" text was shown initially and then disappeared when the page fully loaded
- Fixed an issue in the `lg` breakpoint where header font size would become fluid to the viewport width

## [1.1.7] - 2023-10-18

### Changed

- Displaying an error if empty folder is added

## [1.1.6] - 2023-10-17

### Changed

- Updated links in `EsNavBar` to reflect URL changes from the site redesign
- Updated links in `EsFooter` to reflect URL changes from the site redesign

## [1.1.5] - 2023-10-17

### Changed

- Fixed `EsFileThumbnail` to stop stretching images. Most images of standard
letter dimensions (8.5" x 11") will appear fine. Extremely wide and short images
will also be fine. The outlier is an extremely narrow and tall image, but I
expect the use case for this to be small.

## [1.1.4] - 2023-10-03

### Added

- Vendorized [bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue)
  SCSS and rewrote using modular SCSS

### Changed

- **Breaking:** Upgraded `es-bs-base` SASS compiler from `node-sass` to `dart-sass`
- Refactored all SCSS files to use `@use` or `@forward` instead of the
  deprecated `@import` feature
- Dropped [fusv](https://www.npmjs.com/package/find-unused-sass-variables) linting given
- Dropped `stylelint` in `es-bs-base`, as it's different from other projects

## [0.25.16] - 2023-09-19

### Changed

- Fixed an issue where uploading a file one after another in the same 
session would throw an error saying "You have already uploaded a file with the name "{fileName}". 
Please rename your file and try again.".

## [0.25.15] - 2023-09-18

### Changed

- Made it possible to keep the `EsZipCodeForm` side-by-side on even the smallest screens
by specifying `xs` for `stackUntil`
- Made it possible to hide the privacy section of `EsZipCodeForm` to save space by using
the new `showPrivacySection` prop

## [0.25.14] - 2023-09-12

### Added

- New marketing icons: `IconBank`, `IconCreditCard`, `IconMoney`, `IconPayback`, and `IconSaving`

### Changed

- Added a "Work with us" section to the "About us" menu in `EsNavBar`
- Updated several links in `EsFooter`

## [0.25.13] - 2023-09-06

### Changed

- Fixed an issue with `EsDataTable` where it would print a warning about `BTable` being an unknown custom element
- Fixed a styling issue on the `EsCollapse` docs page

## [0.25.12] - 2023-09-01

### Changed
- `EsCollapse` now accepts `v-model` for full programmatic control

## [0.25.11] - 2023-08-31

### Changed
- Added `arrows` prop to `EsHorizontalList` that will display arrows for left/right navigation

## [0.25.10] - 2023-08-24

### Changed
- The vertical landing page links in `EsNavBar` no longer open in a new tab
- Increased the space between submit button and privacy policy link in `EsZipCodeForm` to meet tappability criteria

## [0.25.9] - 2023-08-22

### Changed

- The primary vertical links in `EsFooter` now point to the new vertical landing page URLs

## [0.25.8] - 2023-08-22

### Changed

- The `visible` prop on `EsCollapse` can now programmatically control the collapse; will cease its control once the user interacts with the collapse
- The primary vertical links in `EsNavBar` now point to the new vertical landing page URLs
- Small spacing change to the desktop layout of `EsReviewModal`

## [0.25.7] - 2023-08-18

### Changed

- `EsFileInput` no longer shows file upload progress and uses the fetch API instead of the axios library
- `EsAccordion` has a new `variant` prop to support a new `minimal` variant
- `EsAccordion` now uses heading tags under the hood and defaults to `<h3>`
- `EsCtaBanner` and `EsCtaCard` no longer use an `<h2>` tag under the hood
- The `coverImageUrl` prop is no longer required in `EsVideo`

## [0.25.6] - 2023-08-14

### Changed

- Added a new `constrained` prop to `EsSupportCard` to enable use in limited-width containers
- Fixed a bug in `EsVideo` where the button had a primary color background; it now has a transparent background.

## [0.25.5] - 2023-08-09

### Changed

- The `EsFileInput` prop `uploadUrls` can now take in an optional `additionalFields` parameter that will be added as form data to the upload
- `EsFileInput` now sets the content type of a file upload to `multipart/form-data`

## [0.25.4] - 2023-08-07

### Changed

- Fixed broken `REGISTER_LINK` variable

## [0.25.2] - 2023-08-07

### Changed

- Made `Create Account` link an environment variable
- Removed `:to` attribute from `EsNavLink`
- Updated all non breaking dependencies

## [0.25.1] - 2023-08-01

### Changed

- ***BREAKING CHANGE:*** The `lgFirst` and `lgSecond` props have been removed from `EsCtaBanner`
- New `constrained` prop for `EsZipCodeForm` to display within constrained-width layouts
- New `hasButton` and `variant` props for `EsCtaBanner` to control font size, column layout, and side padding
- Fixed an issue with `EsCtaCard` where images without an inherent width wouldn't display
- Fixed an issue with `EsZipCodeForm` where error message text was difficult to read in dark mode

## [0.25.0] - 2023-07-28

### Added

- New `EsVideo` component
- New `IconVideoPlay` icon

### Changed

- ***BREAKING CHANGE:*** `text-{color}` utility classes now have `!important` on them, matching the behavior of all other utility classes, and may override other styles where they weren't before

## [0.24.1] - 2023-07-26

### Added

- New `EsCtaBanner` component
- New `EsCtaCard` component
- New `EsZipCodeForm` component
- New ESDS-site-only component `DsPropTable` to easily generate documentation for component props and slots

### Changed

- `EsFileInput` upload will now do a POST instead of a PUT
- Removed duplicate "Form with Field Validation" link from Examples page

## [0.24.0] - 2023-07-25

### Added

- New File Upload example

### Changed

- ***BREAKING CHANGE:*** `EsFormMsg` has changed from using a `message` string prop to passing the message as a slot
- ***BREAKING CHANGE:*** `EsFormMsg` visibility control has changed from the presence/absence of the `message` to a new `show` prop
- ***BREAKING CHANGE:*** The `formMixins` functions `showFormError`, `showFormSuccess`, and `startSubmit` have changed to support the above functionality - and new functions `hideFormError` and `hideFormSuccess` have been added
- `EsFormMsg` now supports displaying any JSX/HTML (e.g. links, text formatting) instead of just a string
- Updates to `EsFileInput`:
  - Added a `deleteFileName` prop to delete a file from file list when the value changes
  - When emitting `fileDataRead`, create a URL for application type files
  - Changed `verifyFiles` to no longer overwrite the existing list of files but rather add to it
  - `uploadUrls` is now specific to a file name
  - When `readyToUpload` is emitted, the list of files (with all their data) is emitted instead of just the number of files
- Updates to `EsFileThumbnail`:
  - Truncated display name
  - Emit the file name as payload for emitted events
- Added a `humanReadable` field to the `mime-type-finder` utils to support better error handling
- The internal `DsResponsiveTable` component used to generate slots and props documentation on the `Typography`,`EsCard`, `EsFileInput`, `EsFileThumbnail`, and `EsSupportCard` pages now has the ability to customize its column widths to match the layout grid in the same manner as `<es-col>` by taking breakpoint props for `md` and up

## [0.23.2] - 2023-07-13

### Added

- New `EsFileInput` component
- New icon `IconUpload`

### Changed

- Fix for `EsNavBar` to correct destination of "Get personalized quotes" under "Heating & cooling" menu

## [0.23.1] - 2023-07-10

### Added

- New `EsErrorPage` component
- New `EsFilePreviewModal` component
- New `EsFileThumbnail` component
- New `EsProgressCircle` component
- New file icons: `IconFileDoc`, `IconFileDocx`, `IconFilePdf`
- New marketing icons: `IconContactUs`, `IconInfoBlogPost`, `IconMarketplace`

### Changed

- `EsFooter` has been moved from Molecules to Organisms
- Fixed issue with `EsFooter` where the DOE logo didn't have alternate text
- Fixed issue with `EsNavBar` where news article images didn't have alternate text

## [0.23.0] - 2023-06-29

### Added

- New `EsDataTable` component

### Changed

- ***BREAKING CHANGE:*** Heading 3 mobile font size has increased from 16px to 18px
- ***BREAKING CHANGE:*** Heading 5 mobile font size has decreased from 16px to 14px
- ***BREAKING CHANGE:*** Heading 6 mobile font size has decreased from 14px to 12px
- Fixed an issue with `EsNavBar` where product nav links were not clickable on certain www pages
- Fixed an issue with `EsNavBar` where the Solar Calculator nav link was missing a trailing slash
- Fixed an issue with `EsNavBar` where the cursor changed to a hand pointer even when not over a link
- Fixed a padding issue with `EsAccordion` when title text wrapped to the next line
- Added tables to Typography page with detailed info about mobile and desktop font sizes

## [0.22.1] - 2023-06-12

### Changed

- Updated all major and minor dependencies
- Fixes a11y issues in `EsNavBar` and `EsRating`

## [0.22.0] - 2023-06-07

### Added

- New `IconShieldWithCheck` icon

## [0.21.9] - 2023-05-19

### Changed

- Updated reviews.io widget configuration to disable `richsnippets`

## [0.21.8] - 2023-05-12

### Changed

- Fixed an issue with `EsNavBar` where some links were not rendering as links due to a missing import

## [0.21.7] - 2023-05-12

### Changed

- The font weight of `<b>` and `<strong>` tags has decreased from `700` to `600`
- `EsFooter` and `EsNavBar` links now support client-side page navigation within a single SPA/Nuxt app if given a root-relative URL instead of an absolute URL
- `EsSupportCard` has a new optional `image` slot allowing full customization of the image component used
- `EsSupportCard` description is now contained in a `<div>` instead of a `<p>`

## [0.21.6] - 2023-05-11

### Added

- New `EsCard` molecule component
- New `EsSupportCard` organism component
- New icons: `IconBolt`, `IconGear`, `IconMoneyBag`, `IconRoof`, `IconSearch`, `IconSolar`, `IconTree`

## [0.21.4] - 2023-05-09

### Changed

- Remaining hardcoded `EsFooter` links and content have been moved out to its associated utility function

## [0.21.3] - 2023-05-09

### Added

- New utility functions for `EsFooter` and `EsNavBar` that provide a default set of content, the domain names for which are customizable

### Changed

- ***BREAKING CHANGE:*** `EsFooter` and `EsNavBar` links are now fully customizable and require their content be passed in as props
- `EsNavBar` logged-in account link has changed from "My Marketplace" to "My Quotes"
- Fixed five `EsNavBar` links that were `http` instead of `https`
- All `EsFooter` and `EsNavBar` links to a non-www domain will now open in a new tab
- All hardcoded text within `EsNavBar` has been moved out to the content objects it takes as props

## [0.21.2] - 2023-05-03

### Changed

- Fixed an issue with `EsNavBar` sticky nav bar where it would display logged-out state when user was logged in

## [0.21.1] - 2023-05-02

### Changed

- `EsNavBar` now includes a sticky nav bar that will show up when the user scrolls down
- `EsNavBar` now includes a My Marketplace link in the account menu
- All registration CTA links within the `EsNavBar` product menus will now be bold
- Minor layout and styling fixes to `EsNavBar`

## [0.21.0] - 2023-05-01

### Added

- New `EsFooter` molecule component
- New `EsPagination` molecule component
- New `EsNavBar` organism component
- New `EsReviewsIoCardCarousel` organism component
- New social icons `IconFacebook`, `IconInstagram`, `IconLinkedIn`, `IconTwitter`, `IconYoutube`
- New `$gray-150` color of `#F8F8F8`
- New utility classes `font-weight-lightest` and `font-weight-boldest`

### Changed

- ***BREAKING CHANGE:*** Base font weight has changed from `400` to `300`
- ***BREAKING CHANGE:*** Header font weight has changed from `700` to `500`
- ***BREAKING CHANGE:*** The max-width of the `xxl` breakpoint has been lowered from `1610px` to `1440px`
- ***BREAKING CHANGE:*** Outline variants of `EsButton` now have a white background instead of transparent
- Fixed an issue with `EsFormInput` where its prefix icon had an invalid `aria-hidden` value

## [0.20.1] - 2023-04-11

### Added

- Added new icons: `Calculator`, `ESLeaf`, `Hamburger`, `LightBulb`
- Added new marketing icons: `Battery`, `Business`, `CommunitySolar`, `ElectricVehicle`, `HeatPump`, `RooftopSolar`
- `EsFormInput` now takes a `prefixIcon` slot to display an icon on the left side of the input

### Changed

- The Icons documentation page is now split into three categories: Base Icons, Rating Star Icons, and Marketing Icons
- The Icons documentation page has a new layout for easier scanning through icon names
- The Icons documentation page has an updated color list for previewing icons
- Added language to the LICENSE regarding the EnergySage registered trademark
- Removed snapshot from EsReviewModal Jest test due to inconsistent behavior

## [0.20.0] - 2023-03-29

### Added

- Added new font size classes to `es-bs-base` and updated `typography` documentation

### Changed

- ***BREAKING CHANGE:*** Older documentation links are no longer available
- Bumped all minor dependency versions

## [0.19.0] - 2023-03-23

### Added

- New spacing options: 24px, 48px, and 128px
- New naming scheme for spacing utility classes (25, 50, 100, 150, etc.)
- New `v-model` functionality for `EsAccordionList`
- Added `v-model` examples to `EsTabs` docs page

### Changed

- ***BREAKING CHANGE:*** All links are now semibold by default
- Reduced font size of `EsSupport` link
- Increased font weight of active tab in `EsTabs`

### Deprecated

- Old naming scheme for spacing utility classes (1, 2, 3, 4, etc.)

## [0.18.0] - 2023-03-08

### Added

- Added new icon `IconFlag`
- Added `report-flag-visible` prop and `reportReview` event to `EsReview`
- Added `inline` prop to `EsButton`

### Changed

- Bumped minor dependency versions
- ***BREAKING CHANGE:*** updated definition of `$orange` to `#B95100`
- ***BREAKING CHANGE:*** updated definition of `$gray` to `#292929`
- Updated color docs to reflect changes and improve UX

### Fixed

- Fixed issues in `EsCollapse` and `EsViewMore` button spacing. Both now use new `inline` prop.

## [0.17.2] - 2023-02-27

### Added

- added `labelSrOnly` to `EsFormInput`

### Changed

- Bumped minor dependency versions

## [0.17.0] - 2023-02-23

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
- Created responsive breakpoint [documentation](https://design.energysage.dev/atoms/layout)

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

[3.0.2]: https://github.com/EnergySage/es-ds/pull/1574
[3.0.1]: https://github.com/EnergySage/es-ds/pull/1571
[3.0.0]: https://github.com/EnergySage/es-ds/pull/1461
[2.1.0]: https://github.com/EnergySage/es-ds/compare/v2.0.6...v2.1.0
[2.0.6]: https://github.com/EnergySage/es-ds/compare/v2.0.5...v2.0.6
[2.0.5]: https://github.com/EnergySage/es-ds/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/EnergySage/es-ds/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/EnergySage/es-ds/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/EnergySage/es-ds/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/EnergySage/es-ds/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/EnergySage/es-ds/compare/v1.3.9...v2.0.0
[1.3.9]: https://github.com/EnergySage/es-ds/compare/v1.3.8...v1.3.9
[1.3.8]: https://github.com/EnergySage/es-ds/compare/v1.3.7...v1.3.8
[1.3.7]: https://github.com/EnergySage/es-ds/compare/v1.3.6...v1.3.7
[1.3.6]: https://github.com/EnergySage/es-ds/compare/v1.3.5...v1.3.6
[1.3.5]: https://github.com/EnergySage/es-ds/compare/v1.3.2...v1.3.5
[1.3.2]: https://github.com/EnergySage/es-ds/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/EnergySage/es-ds/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/EnergySage/es-ds/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/EnergySage/es-ds/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/EnergySage/es-ds/compare/v1.1.13...v1.2.0
[1.1.13]: https://github.com/EnergySage/es-ds/compare/v1.1.12...v1.1.13
[1.1.12]: https://github.com/EnergySage/es-ds/compare/v1.1.11...v1.1.12
[1.1.11]: https://github.com/EnergySage/es-ds/compare/v1.1.10...v1.1.11
[1.1.10]: https://github.com/EnergySage/es-ds/compare/v1.1.9...v1.1.10
[1.1.9]: https://github.com/EnergySage/es-ds/compare/v1.1.8...v1.1.9
[1.1.8]: https://github.com/EnergySage/es-ds/compare/v1.1.7...v1.1.8
[1.1.7]: https://github.com/EnergySage/es-ds/compare/v1.1.6...v1.1.7
[1.1.6]: https://github.com/EnergySage/es-ds/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/EnergySage/es-ds/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/EnergySage/es-ds/compare/v0.25.16...v1.1.4
[0.25.16]: https://github.com/EnergySage/es-ds/compare/v0.25.15...v0.25.16
[0.25.15]: https://github.com/EnergySage/es-ds/compare/v0.25.14...v0.25.15
[0.25.14]: https://github.com/EnergySage/es-ds/compare/v0.25.13...v0.25.14
[0.25.13]: https://github.com/EnergySage/es-ds/compare/v0.25.12...v0.25.13
[0.25.12]: https://github.com/EnergySage/es-ds/compare/v0.25.11...v0.25.12
[0.25.11]: https://github.com/EnergySage/es-ds/compare/v0.25.10...v0.25.11
[0.25.10]: https://github.com/EnergySage/es-ds/compare/v0.25.9...v0.25.10
[0.25.9]: https://github.com/EnergySage/es-ds/compare/v0.25.8...v0.25.9
[0.25.8]: https://github.com/EnergySage/es-ds/compare/v0.25.7...v0.25.8
[0.25.7]: https://github.com/EnergySage/es-ds/compare/v0.25.6...v0.25.7
[0.25.6]: https://github.com/EnergySage/es-ds/compare/v0.25.5...v0.25.6
[0.25.5]: https://github.com/EnergySage/es-ds/compare/v0.25.4...v0.25.5
[0.25.4]: https://github.com/EnergySage/es-ds/compare/v0.25.2...v0.25.4
[0.25.2]: https://github.com/EnergySage/es-ds/compare/v0.25.1...v0.25.2
[0.25.1]: https://github.com/EnergySage/es-ds/compare/v0.25.0...v0.25.1
[0.25.0]: https://github.com/EnergySage/es-ds/compare/v0.24.1...v0.25.0
[0.24.1]: https://github.com/EnergySage/es-ds/compare/v0.24.0...v0.24.1
[0.24.0]: https://github.com/EnergySage/es-ds/compare/v0.23.2...v0.24.0
[0.23.2]: https://github.com/EnergySage/es-ds/compare/v0.23.1...v0.23.2
[0.23.1]: https://github.com/EnergySage/es-ds/compare/v0.23.0...v0.23.1
[0.23.0]: https://github.com/EnergySage/es-ds/compare/v0.22.1...v0.23.0
[0.22.1]: https://github.com/EnergySage/es-ds/compare/v0.22.0...v0.22.1
[0.22.0]: https://github.com/EnergySage/es-ds/compare/v0.21.9...v0.22.0
[0.21.8]: https://github.com/EnergySage/es-ds/compare/v0.21.7...v0.21.8
[0.21.7]: https://github.com/EnergySage/es-ds/compare/v0.21.6...v0.21.7
[0.21.6]: https://github.com/EnergySage/es-ds/compare/v0.21.4...v0.21.6
[0.21.4]: https://github.com/EnergySage/es-ds/compare/v0.21.3...v0.21.4
[0.21.3]: https://github.com/EnergySage/es-ds/compare/v0.21.2...v0.21.3
[0.21.2]: https://github.com/EnergySage/es-ds/compare/v0.21.1...v0.21.2
[0.21.1]: https://github.com/EnergySage/es-ds/compare/v0.21.0...v0.21.1
[0.21.0]: https://github.com/EnergySage/es-ds/compare/v0.20.1...v0.21.0
[0.20.1]: https://github.com/EnergySage/es-ds/compare/v0.20.0...v0.20.1
[0.20.0]: https://github.com/EnergySage/es-ds/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/EnergySage/es-ds/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/EnergySage/es-ds/compare/v0.17.2...v0.18.0
[0.17.2]: https://github.com/EnergySage/es-ds/compare/v0.17.0...v0.17.2
[0.17.0]: https://github.com/EnergySage/es-ds/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/EnergySage/es-ds/compare/v0.15.1...v0.16.0
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
