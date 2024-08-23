import 'clipboard' // For the copy to clipboard plugin
import Prism from 'prismjs'
import { nextTick } from 'vue'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-javascript'

import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'

import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/plugins/autolinker/prism-autolinker'
import 'prismjs/plugins/match-braces/prism-match-braces'
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

const SOURCE_LINK_PREFIX = 'https://github.com/EnergySage/es-ds/blob/main/'

// Register custom view source button; seen on hover of code block
Prism.plugins.toolbar.registerButton('source', {
    text: 'View Source',
    onClick(env) {
        const linkSuffix = env.element.dataset?.source
        if (linkSuffix) {
            window.open(`${SOURCE_LINK_PREFIX}${linkSuffix}`)
        }
        else {
            // eslint-disable-next-line no-alert
            alert('No source Provided')
        }
    },
})

// Set defaults for normalizer to handle raw .vue files
Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
})

export default defineNuxtPlugin(() => {
    const normalizer = Prism.plugins.NormalizeWhitespace

    const prism = {
        Prism,
        normalizer,
        normalizeCode: (code, lang = 'javascript') => {
            const cleanCode = normalizer.normalize(code)

            return Prism.highlight(cleanCode, Prism.languages[lang])
        },
        highlight: () => {
            nextTick(() => {
                Prism.highlightAll()
            })
        },
    }
    return {
        provide: {
            prism,
        },
    }
})
