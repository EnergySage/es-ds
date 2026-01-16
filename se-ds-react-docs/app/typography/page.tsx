// Font sizes from theme.css
const fontSizes = [
  { name: 'text-xs', size: '0.75rem', px: 12, label: 'Extra Small' },
  { name: 'text-sm', size: '0.875rem', px: 14, label: 'Small' },
  { name: 'text-base', size: '1rem', px: 16, label: 'Base' },
  { name: 'text-lg', size: '1.125rem', px: 18, label: 'Large' },
  { name: 'text-xl', size: '1.25rem', px: 20, label: 'Extra Large' },
  { name: 'text-2xl', size: '1.5rem', px: 24, label: '2X Large' },
  { name: 'text-3xl', size: '1.875rem', px: 30, label: '3X Large' },
  { name: 'text-4xl', size: '2.375rem', px: 38, label: '4X Large' },
  { name: 'text-5xl', size: '3rem', px: 48, label: '5X Large' },
  { name: 'text-6xl', size: '3.375rem', px: 54, label: '6X Large' },
  { name: 'text-7xl', size: '3.875rem', px: 62, label: '7X Large' },
];

const fontWeights = [
  { name: 'font-extralight', weight: '200', label: 'Extra Light' },
  { name: 'font-light', weight: '300', label: 'Light' },
  { name: 'font-normal', weight: '400', label: 'Normal' },
  { name: 'font-medium', weight: '500', label: 'Medium' },
  { name: 'font-semibold', weight: '600', label: 'Semibold' },
  { name: 'font-bold', weight: '700', label: 'Bold' },
  { name: 'font-extrabold', weight: '800', label: 'Extra Bold' },
];

const headingExamples = [
  { tag: 'h1', label: 'Heading 1', class: 'text-5xl font-bold' },
  { tag: 'h2', label: 'Heading 2', class: 'text-4xl font-bold' },
  { tag: 'h3', label: 'Heading 3', class: 'text-3xl font-semibold' },
  { tag: 'h4', label: 'Heading 4', class: 'text-2xl font-semibold' },
  { tag: 'h5', label: 'Heading 5', class: 'text-xl font-semibold' },
  { tag: 'h6', label: 'Heading 6', class: 'text-lg font-semibold' },
];

export default function TypographyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-4">Typography</h1>
      <p className="text-lg mb-4">
        Based on{' '}
        <a
          href="https://tailwindcss.com/docs/font-size"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Tailwind CSS typography utilities
        </a>
      </p>
      <p className="text-base mb-8">
        When writing a heading, please ensure that the copy style is{' '}
        <a
          href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Sentence case
        </a>
        . Also, please{' '}
        <a
          href="https://a11y-style-guide.com/style-guide/section-general.html#kssref-general-typography"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          do not
        </a>{' '}
        rely only on the appearance of the font (color, shape, font variation, placement, etc.) to convey meaning.
      </p>

      {/* Headings */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Headings</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 border-b border-gray-300">Example</th>
                <th className="text-left p-4 border-b border-gray-300">Classes</th>
              </tr>
            </thead>
            <tbody>
              {headingExamples.map((heading, idx) => {
                const Component = heading.tag as keyof JSX.IntrinsicElements;
                return (
                  <tr key={heading.tag} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 border-b border-gray-200">
                      <Component className={heading.class}>{heading.label}</Component>
                    </td>
                    <td className="p-4 border-b border-gray-200">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{heading.class}</code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Body Text */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Body Text</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Text Sizes</h3>
            <p className="text-base mb-6">
              The default body text size is <code className="bg-gray-100 px-2 py-1 rounded">text-base</code> (16px).
              You can adjust text size using these utilities:
            </p>
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-xs">Extra small text (12px)</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-xs</code>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-sm">Small text (14px)</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-sm</code>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-base">Base text (16px)</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-base</code>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-lg">Large text (18px)</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-lg</code>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-xl">Extra large text (20px)</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-xl</code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Links</h3>
            <div className="space-y-3">
              <p className="text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  Small link
                </a>{' '}
                - <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-sm text-blue-600 hover:underline</code>
              </p>
              <p className="text-base">
                <a href="#" className="text-blue-600 hover:underline">
                  Base link
                </a>{' '}
                - <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-base text-blue-600 hover:underline</code>
              </p>
              <p className="text-lg">
                <a href="#" className="text-blue-600 hover:underline">
                  Large link
                </a>{' '}
                - <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-lg text-blue-600 hover:underline</code>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Lists</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Unordered List</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>First item</li>
                  <li>Second item</li>
                  <li>Third item</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ordered List</h4>
                <ol className="list-decimal list-inside space-y-1">
                  <li>First item</li>
                  <li>Second item</li>
                  <li>Third item</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Unstyled List</h4>
                <ul className="list-none space-y-1">
                  <li>First item</li>
                  <li>Second item</li>
                  <li>Third item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Font Weight */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Font Weight</h2>
        <p className="text-base mb-6">
          These utility classes apply different font weights to text.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 border-b border-gray-300">Name</th>
                <th className="text-left p-4 border-b border-gray-300">Weight</th>
                <th className="text-left p-4 border-b border-gray-300">Example</th>
              </tr>
            </thead>
            <tbody>
              {fontWeights.map((weight, idx) => (
                <tr key={weight.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 border-b border-gray-200">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{weight.name}</code>
                  </td>
                  <td className="p-4 border-b border-gray-200 font-mono text-sm">{weight.weight}</td>
                  <td className="p-4 border-b border-gray-200">
                    <span className={weight.name}>The quick brown fox jumps over the lazy dog.</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Font Size Reference */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Font Size Reference</h2>
        <p className="text-base mb-6">
          Complete font size scale with pixel and rem values.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 border-b border-gray-300">Name</th>
                <th className="text-left p-4 border-b border-gray-300">Size</th>
                <th className="text-left p-4 border-b border-gray-300">Example</th>
              </tr>
            </thead>
            <tbody>
              {fontSizes.map((size, idx) => (
                <tr key={size.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 border-b border-gray-200">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{size.name}</code>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <div className="font-mono text-sm">
                      {size.px}px / {size.size}
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <span className={size.name}>The quick brown fox jumps over the lazy dog.</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Text Alignment */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Text Alignment</h2>
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-left mb-2">Left aligned text</p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-left</code>
          </div>
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-center mb-2">Center aligned text</p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-center</code>
          </div>
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-right mb-2">Right aligned text</p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-right</code>
          </div>
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-justify mb-2">
              Justified text will expand to fill the full width of its container. This can be useful for certain
              layouts but should be used sparingly as it can create uneven spacing.
            </p>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">text-justify</code>
          </div>
        </div>
      </section>

      {/* Text Decoration */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Text Decoration & Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="underline">Underlined text</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">underline</code>
            </div>
            <div className="flex items-center gap-4">
              <span className="line-through">Strikethrough text</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">line-through</code>
            </div>
            <div className="flex items-center gap-4">
              <span className="no-underline">No underline</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">no-underline</code>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="italic">Italic text</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">italic</code>
            </div>
            <div className="flex items-center gap-4">
              <span className="uppercase">Uppercase text</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">uppercase</code>
            </div>
            <div className="flex items-center gap-4">
              <span className="lowercase">LOWERCASE TEXT</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">lowercase</code>
            </div>
            <div className="flex items-center gap-4">
              <span className="capitalize">capitalize each word</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">capitalize</code>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section className="my-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Usage Example</h2>
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
          <h3 className="text-2xl font-bold mb-4">Article Title</h3>
          <p className="text-sm text-gray-600 mb-4">Published on January 8, 2026</p>
          <p className="text-base mb-4 leading-relaxed">
            This is a paragraph with <span className="font-semibold">semibold text</span> and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              a link
            </a>
            . The text uses the base font size with relaxed line height for better readability.
          </p>
          <p className="text-sm text-gray-600">
            This is smaller text, often used for captions or secondary information.
          </p>
        </div>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<h3 className="text-2xl font-bold mb-4">Article Title</h3>
<p className="text-sm text-gray-600 mb-4">Published on January 8, 2026</p>
<p className="text-base mb-4 leading-relaxed">
  This is a paragraph with <span className="font-semibold">semibold text</span>
</p>`}
        </pre>
      </section>
    </div>
  );
}
