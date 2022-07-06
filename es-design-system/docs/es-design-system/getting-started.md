# Getting Started

To begin; create a [fork](https://github.com/EnergySage/es-design-system/fork) of this repo.

```bash
$ git clone git@github.com:EnergySage/es-design-system.git && cd es-design-system
[es-design-system]$ ulimit -n 65535  # Temporarily increase the max number of open files
[es-design-system]$ brew bundle --verbose --file Brewfile
[es-design-system]$ echo -e 'eval "$(nodenv init -)"' >> ~/.zshrc # If you have never installed nodenv before
[es-design-system]$ source ~/.zshrc # If you have never installed nodenv before
[es-design-system]$ nodenv update-version-defs
[es-design-system]$ nodenv install 14.19.3 && nodenv local 14.19.3
[es-design-system]$ npm install
[es-design-system]$ npm run dev
```

The local storybook instance should now be available at [http://localhost:8500/](http://localhost:8500/).

## New Component/Documentation

To create a new component or new documentation run the following command and follow the prompts.

```bash
[es-design-system]$ npm run plop
    ? [PLOP] Please choose a generator. (Use arrow keys)
    ❯ New Vue Component - generate a new vue component and supporting files 
    New Documentation Story - generate a new documentation story 
    Exit 

    ? Enter a name EsInput # component name should always start with `Es` and be in PascalCase
    ? What size is the component? (Use arrow keys) # select the correct component size
    ❯ Atom 
    Molecule 
    Organism 
    Template 
    Page 

    # It is encouraged to extend existing bootstrap-vue components whenever possible
    Enter comma seperated list of required Bootstrap-vue components. Enter for none. BInput, BLabel
    ✔  ++ /components/EsInput/EsInput.vue
    ✔  ++ /components/EsInput/EsInput.spec.js
    ✔  ++ /components/EsInput/EsInput.stories.mdx

    ? [PLOP] Please choose a generator. 
    New Vue Component - generate a new vue component and supporting files 
    ❯ New Documentation Story - generate a new documentation story 
    Exit 

    ? [PLOP] Please choose a generator. New Documentation Story - generate a new documentation story
    ? Enter a name introduction # documentation name should be in kabab-case

    ✔  ++ /content/introduction/introduction.stories.mdx
```

Assuming you have already started storybook `npm run dev`; your story should now be available at [http://localhost:8500/](http://localhost:8500/).
Your story will hot reload as you make changes to your `.vue` file.

References:

- [PascalCase](https://www.theserverside.com/definition/Pascal-case)
- [kebab-case](https://en.wiktionary.org/wiki/kebab_case)
- [Atomic Design Stages](https://atomicdesign.bradfrost.com/chapter-2/)
- [bootstrap-vue components](https://bootstrap-vue.org/docs/components)

## Further Reading

- [components.md](./components.md) How to write a vue component
- [stories.md](./stories.md) How to write a story
- [tests.md](./tests.md) How to write tests
