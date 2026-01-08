// Spacing scale from theme.css
const spacingScale = [
  { key: '0', alias: 'p-0 m-0', rem: '0', px: 0 },
  { key: '1', alias: 'p-1 m-1', rem: '0.25rem', px: 4 },
  { key: '2', alias: 'p-2 m-2', rem: '0.5rem', px: 8 },
  { key: '3', alias: 'p-3 m-3', rem: '0.75rem', px: 12 },
  { key: '4', alias: 'p-4 m-4', rem: '1rem', px: 16 },
  { key: '5', alias: 'p-5 m-5', rem: '1.25rem', px: 20 },
  { key: '6', alias: 'p-6 m-6', rem: '1.5rem', px: 24 },
  { key: '8', alias: 'p-8 m-8', rem: '2rem', px: 32 },
  { key: '10', alias: 'p-10 m-10', rem: '2.5rem', px: 40 },
  { key: '12', alias: 'p-12 m-12', rem: '3rem', px: 48 },
  { key: '16', alias: 'p-16 m-16', rem: '4rem', px: 64 },
  { key: '20', alias: 'p-20 m-20', rem: '5rem', px: 80 },
  { key: '24', alias: 'p-24 m-24', rem: '6rem', px: 96 },
  { key: '32', alias: 'p-32 m-32', rem: '8rem', px: 128 },
];

export default function SpacingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-4">Spacing</h1>
      <p className="text-lg mb-4">
        Extended from{' '}
        <a
          href="https://tailwindcss.com/docs/padding"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Tailwind CSS spacing utilities
        </a>
      </p>

      <div className="mb-12">
        <p className="text-base mb-4">
          The spacing scale is consistent across padding, margin, width, height, and gap utilities. Each spacing value
          is available in both rem and px units.
        </p>
        <p className="text-base mb-8">
          For example, <code className="bg-gray-100 px-2 py-1 rounded">p-4</code> applies 1rem (16px) of padding,
          and <code className="bg-gray-100 px-2 py-1 rounded">m-4</code> applies 1rem (16px) of margin.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 border-b border-gray-300">Example</th>
                <th className="text-left p-4 border-b border-gray-300">Name</th>
                <th className="text-left p-4 border-b border-gray-300">Size (px)</th>
                <th className="text-left p-4 border-b border-gray-300">Size (rem)</th>
              </tr>
            </thead>
            <tbody>
              {spacingScale.map((space, idx) => (
                <tr key={space.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 border-b border-gray-200">
                    {space.px > 0 ? (
                      <div className="relative inline-block">
                        <div
                          className={`bg-blue-100 border-2 border-blue-500 relative`}
                          style={{
                            width: `${Math.min(space.px, 100)}px`,
                            height: `${Math.min(space.px, 100)}px`,
                          }}
                        >
                          <span
                            className={`absolute font-semibold text-blue-900 text-sm ${
                              space.px < 24
                                ? 'left-full ml-2 top-1/2 -translate-y-1/2'
                                : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                            }`}
                          >
                            {space.px}px
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="font-semibold">{space.px}px</span>
                    )}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{space.alias}</code>
                  </td>
                  <td className="p-4 border-b border-gray-200 font-mono text-sm">{space.px}px</td>
                  <td className="p-4 border-b border-gray-200 font-mono text-sm">{space.rem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spacing Directions */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Spacing Directions</h2>
        <p className="text-base mb-6">
          Apply spacing to specific sides using directional utilities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Padding */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Padding</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">p-4</code>
                <span className="text-gray-600">All sides</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">px-4</code>
                <span className="text-gray-600">Left & right</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">py-4</code>
                <span className="text-gray-600">Top & bottom</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">pt-4</code>
                <span className="text-gray-600">Top</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">pr-4</code>
                <span className="text-gray-600">Right</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">pb-4</code>
                <span className="text-gray-600">Bottom</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">pl-4</code>
                <span className="text-gray-600">Left</span>
              </div>
            </div>
          </div>

          {/* Margin */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Margin</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">m-4</code>
                <span className="text-gray-600">All sides</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">mx-4</code>
                <span className="text-gray-600">Left & right</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">my-4</code>
                <span className="text-gray-600">Top & bottom</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">mt-4</code>
                <span className="text-gray-600">Top</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">mr-4</code>
                <span className="text-gray-600">Right</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">mb-4</code>
                <span className="text-gray-600">Bottom</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono min-w-[80px]">ml-4</code>
                <span className="text-gray-600">Left</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="my-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>

        <div className="space-y-8">
          {/* Padding Example */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Padding</h3>
            <div className="bg-white border-2 border-blue-500 inline-block">
              <div className="bg-blue-100 p-8">
                <div className="bg-white border-2 border-dashed border-blue-500 p-4">
                  Content with p-8 (32px padding)
                </div>
              </div>
            </div>
            <pre className="mt-4 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<div className="p-8">
  Content with padding
</div>`}
            </pre>
          </div>

          {/* Margin Example */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Margin</h3>
            <div className="bg-blue-100 border-2 border-blue-500 inline-block p-4">
              <div className="bg-white border-2 border-dashed border-blue-500 p-4 m-8">
                Content with m-8 (32px margin)
              </div>
            </div>
            <pre className="mt-4 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<div className="m-8">
  Content with margin
</div>`}
            </pre>
          </div>

          {/* Combined Example */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Combined Spacing</h3>
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Card with spacing</h4>
                <p className="text-gray-600">Using px-6 py-4 mb-4</p>
              </div>
              <div className="bg-blue-50 px-6 py-4 mb-4 rounded">
                <p className="text-sm">This element has horizontal padding of 24px and vertical padding of 16px</p>
              </div>
            </div>
            <pre className="mt-4 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<div className="px-6 py-4 mb-4">
  Content with horizontal and vertical spacing
</div>`}
            </pre>
          </div>

          {/* Space Between */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Gap (Space Between)</h3>
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="bg-blue-500 text-white p-4 rounded">Item 1</div>
                <div className="bg-blue-500 text-white p-4 rounded">Item 2</div>
                <div className="bg-blue-500 text-white p-4 rounded">Item 3</div>
              </div>
            </div>
            <pre className="mt-4 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Negative Margins */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Negative Margins</h2>
        <p className="text-base mb-6">
          You can also use negative margins by prefixing the utility with a minus sign:
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">-m-4</code>
            <span className="text-gray-600">Negative margin on all sides</span>
          </div>
          <div className="flex items-center gap-4">
            <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">-mt-4</code>
            <span className="text-gray-600">Negative margin top</span>
          </div>
          <div className="flex items-center gap-4">
            <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">-mx-4</code>
            <span className="text-gray-600">Negative margin left & right</span>
          </div>
        </div>
      </section>
    </div>
  );
}
