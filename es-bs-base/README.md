# EnergySage es-bs-base

An EnergySage branded Bootstrap

## Usage

Dependencies for Django

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/@energysage/es-bs-base@0.1.6/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-/HzsDxor0D2Kr3OmJOdJ/6NGC9/5ADDEXmBATS6Q4lmVlfc+W69bDSevZ1oXXpnL" crossorigin="anonymous">

<!-- JS -->
<script
  src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
  integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/@energysage/es-bs-base@0.1.6/dist/js/bootstrap.min.js"
  integrity="sha384-zOjf0f6LrmdJchXp76FkceJ0VFCvV4MrYMIALHhaz74LZYD2U4PNd/mZ3Qn0ezau"
  crossorigin="anonymous"></script>
```

## Publishing a new version

1. Test changes via `npm run test`
2. Build CSS & JS via `npm run dist`
3. Update the package version via `npm run release-version 0.1.5 0.1.6` (old & new versions with what's correct at time of release)
4. Generate new zipped files for distribution via `npm run release-zip`
5. `npm publish`

*NOTE* you'll need to create an npm account with authorization to publish to `@energysage` prior to running `npm publish`.
To create an account head on over to [npmjs.com](https://www.npmjs.com/).
