import 'clipboard'; // For the copy to clipboard plugin
import Prism from 'prismjs';
import Vue from 'vue';

import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-javascript';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/autolinker/prism-autolinker';
import 'prismjs/plugins/match-braces/prism-match-braces';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';

// eslint-disable-next-line no-unused-vars
const SOURCE_LINK_PREFIX = 'https://github.com/EnergySage/es-ds/blob/main/';
Prism.plugins.toolbar.registerButton('source', {
    text: 'Open Source',
    onClick(env) {
        const linkSuffix = env.element.dataset?.source;
        if (linkSuffix) {
            window.open(`${SOURCE_LINK_PREFIX}${linkSuffix}`);
        } else {
            // eslint-disable-next-line no-alert
            alert('No source Provided');
        }
    },
});

Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
});

Vue.component('CodeBlock', {
    props: {
        lang: {
            type: String,
            default: 'javascript',
        },
        code: {
            type: String,
            required: false,
            default: '',
        },
        source: {
            type: String,
            required: false,
            default: '',
        },
    },
    // eslint-disable-next-line no-template-curly-in-string
    template: '<div class="prism"><pre class="line-numbers" :class="`language-${lang}`"><code class="match-braces" :data-source="source" v-html="code" /></pre></div>',
});

export default async (ctx, inject) => {
    const normalizer = Prism.plugins.NormalizeWhitespace;

    const prism = {
        Prism,
        normalizer,
        normalizeCode: (code, lang = 'javascript') => {
            const cleanCode = normalizer.normalize(code);

            return Prism.highlight(cleanCode, Prism.languages[lang]);
        },
        highlight: (vue) => {
            vue.$nextTick(() => {
                Prism.highlightAll();
            });
        },
    };
    ctx.$prism = prism;
    inject('prism', prism);
};
