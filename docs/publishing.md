# Publishing

How to publish new versions of the design system.

For simplicity of deployment, versioning of packages are fixed and updated together.
This will allow for easier maintenance of our [CHANGELOG](../CHANGELOG.md) and simplify incremental updates of the design-system as a whole.

## Publishing a new version of a package

*Assuming changes are approved*

1. Run tests `make test`
2. Build & Compile `make build`
3. Merge in Changes
4. Run `make publish`
5. `make update`
6. Update changelog
7. Merge `origin` changes into `upstream`
