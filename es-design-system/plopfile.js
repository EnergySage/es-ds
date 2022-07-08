/**
 * https://plopjs.com/
 * Plop configuration file.  `npm run plop`
 */

/**
 *
 * @param { string } name file name
 * @returns { boolean|string } true if found error if not
 */
const componentNameValidator = (name) => (v) => {
    if (!v || v.trim === '') {
        return `${name} is required`;
    }
    return true;
};

module.exports = function plopConfig(plop) {
    const namePrompt = {
        type: 'input',
        name: 'name',
        message: 'Enter a name',
        validate: componentNameValidator('name'),
    };
    const sizePrompt = {
        type: 'list',
        name: 'size',
        message: 'What size is the component?',
        // TODO: use utils/metadata.js
        choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page'],
    };
    const bootstrapVuePrompt = {
        type: 'input',
        name: 'components',
        message: 'Enter comma seperated list of required Bootstrap-vue components. Enter for none.',
    };
    const nameProper = '{{ properCase name }}';
    const kebabCase = '{{ kebabCase name }}';
    const nameLower = '{{ lowerCase name }}';

    /**
     * Component Generation
     */
    plop.setGenerator('New Vue Component', {
        description: 'generate a new vue component and supporting files',
        prompts: [
            namePrompt,
            sizePrompt,
            bootstrapVuePrompt,
        ],
        actions: () => [
            {
                type: 'add',
                path: `components/${nameProper}/${nameProper}.vue`,
                templateFile: 'plop-templates/component.vue.hbs',
            }, {
                type: 'add',
                path: `components/${nameProper}/${nameProper}.spec.js`,
                templateFile: 'plop-templates/component.spec.js.hbs',
            }, {
                type: 'add',
                path: `components/${nameProper}/${nameProper}.stories.mdx`,
                templateFile: 'plop-templates/component.stories.mdx.hbs',
            },
        ],
    });

    /**
     * Documentation Generation
     */
    plop.setGenerator('New Public Documentation', {
        description: 'generate a new documentation story',
        prompts: [
            namePrompt,
        ],
        actions: () => [
            {
                type: 'add',
                path: `content/${nameLower}/${nameLower}.stories.mdx`,
                templateFile: 'plop-templates/documentation.stories.mdx.hbs',
            },
        ],
    });

    /**
     * Icon Generation
     */
    plop.setGenerator('New Icon', {
        description: 'generate a new svg icon component',
        prompts: [
            namePrompt,
        ],
        actions: () => [
            {
                type: 'add',
                path: `components/svg/${kebabCase}.vue`,
                templateFile: 'plop-templates/icon.vue.hbs',
            },
        ],
    });

    plop.setGenerator('Exit', {
        prompts: [],
        actions: [],
    });
};
