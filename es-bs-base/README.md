# EnergySage es-bs-base

An EnergySage branded Bootstrap

## Usage

Dependencies for Django

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/es-bs-base@0.1.1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-/HzsDxor0D2Kr3OmJOdJ/6NGC9/5ADDEXmBATS6Q4lmVlfc+W69bDSevZ1oXXpnL" crossorigin="anonymous">

<!-- JavaScript -->
<script
  src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/es-bs-base@0.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-rFjmWkQarRMLmS4gmgGFJJpv1wPehpBZjbbursNR1K/8U4DZp3ehpW8x5GOBrLvS"
  crossorigin="anonymous"></script>
```

Or you can split the dependencies for JavaScript

```html
<script
  src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
  integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/es-bs-base@0.1.1/dist/js/bootstrap.min.js"
  integrity="sha384-GsH/Mph6Qam9aL9saQZovjWdPJ8zV4wJUp093sGem578iwcgsgHSS8i0muB6VWn5"
  crossorigin="anonymous"></script>
```

## Publishing a new version

1. Test changes via `npm run test`
2. Build CSS & JS via `npm run dist`
3. Update the package version via `npm run release-version`
4. Generate new zipped files for distribution via `npm run release-zip`
5. `npm publish`
