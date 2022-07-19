# EnergySage es-bs-base

An EnergySage branded Bootstrap

## Publishing a new version

1. Test changes via `npm run test`
2. Build CSS & JS via `npm run dist`
3. Update the package version via `npm run release-version 0.1.5 0.1.6` (old & new versions with what's correct at time of release)
4. Generate new zipped files for distribution via `npm run release-zip`
5. `npm publish`

*NOTE* you'll need to create an npm account with authorization to publish to `@energysage` prior to running `npm publish`.
To create an account head on over to [npmjs.com](https://www.npmjs.com/).
