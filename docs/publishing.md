# Publishing

How to publish new versions of the design system.

For simplicity of deployment, versioning of packages are fixed and updated together.
This will allow for easier maintenance of our [CHANGELOG](../CHANGELOG.md) and simplify incremental updates of the design-system as a whole.

## Publishing a new version of a package

*Assuming changes are approved*

1. Test changes (will vary based on package)
2. Build & Compile (will vary based on package)
3. Merge locally
4. Run `make publish`
5. Update changelog
6. Merge local (`origin`) changes into `upstream`
