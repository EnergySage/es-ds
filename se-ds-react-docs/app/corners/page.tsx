// Border radius definitions from theme.css
const borderRadiusOptions = [
  {
    name: 'none',
    class: 'rounded-none',
    sizeRem: '0',
    sizePx: 0,
    description: 'No border radius',
    examples: ['Rectangular elements', 'Hard edges'],
  },
  {
    name: 'sm',
    class: 'rounded-sm',
    sizeRem: '0.25rem',
    sizePx: 4,
    description: 'Small border radius',
    examples: ['Badges', 'Tags', 'Pills'],
  },
  {
    name: 'base',
    class: 'rounded',
    sizeRem: '0.5rem',
    sizePx: 8,
    description: 'Base border radius',
    examples: ['Buttons', 'Inputs', 'Cards'],
  },
  {
    name: 'md',
    class: 'rounded-md',
    sizeRem: '0.75rem',
    sizePx: 12,
    description: 'Medium border radius',
    examples: ['Modals', 'Panels', 'Tooltips'],
  },
  {
    name: 'lg',
    class: 'rounded-lg',
    sizeRem: '1rem',
    sizePx: 16,
    description: 'Large border radius',
    examples: ['Large cards', 'Containers', 'Hero sections'],
  },
  {
    name: 'xl',
    class: 'rounded-xl',
    sizeRem: '1.5rem',
    sizePx: 24,
    description: 'Extra large border radius',
    examples: ['Feature cards', 'Image containers'],
  },
  {
    name: '2xl',
    class: 'rounded-2xl',
    sizeRem: '2rem',
    sizePx: 32,
    description: '2X large border radius',
    examples: ['Large panels', 'Special sections'],
  },
  {
    name: 'full',
    class: 'rounded-full',
    sizeRem: '9999px',
    sizePx: 9999,
    description: 'Fully rounded (circular)',
    examples: ['Avatars', 'Circular buttons', 'Icons'],
  },
];

export default function CornersPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-4">Corners</h1>
      <p className="text-lg mb-8">
        Below are the border radius sizes used throughout the design system. Use the utility classes listed below
        (e.g. <code className="bg-gray-100 px-2 py-1 rounded">rounded</code>) to add the desired corner radius to
        your UI elements.
      </p>

      {/* Border Radius Grid */}
      <section className="my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {borderRadiusOptions.map((item) => (
            <div key={item.name} className="flex flex-col">
              <div
                className={`bg-blue-100 text-blue-900 p-6 text-center min-h-[200px] flex flex-col justify-center items-center ${item.class}`}
              >
                <p className="text-2xl font-semibold mb-2">
                  {item.name} / {item.sizePx}px
                </p>
                <p className="mb-4">
                  <code className="bg-blue-200 px-3 py-1 rounded text-sm font-mono">{item.class}</code>
                </p>
                <div className="text-sm">
                  <p className="mb-1 font-medium">Used for:</p>
                  <ul className="text-xs space-y-1">
                    {item.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reference Table */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Border Radius Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 border-b border-gray-300">Name</th>
                <th className="text-left p-4 border-b border-gray-300">Utility Class</th>
                <th className="text-left p-4 border-b border-gray-300">CSS Variable</th>
                <th className="text-left p-4 border-b border-gray-300">Value (rem)</th>
                <th className="text-left p-4 border-b border-gray-300">Value (px)</th>
                <th className="text-left p-4 border-b border-gray-300">Example</th>
              </tr>
            </thead>
            <tbody>
              {borderRadiusOptions.map((item, idx) => (
                <tr key={item.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 border-b border-gray-200 font-medium">{item.name}</td>
                  <td className="p-4 border-b border-gray-200">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{item.class}</code>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">--radius-{item.name === 'base' ? '' : item.name}</code>
                  </td>
                  <td className="p-4 border-b border-gray-200 font-mono text-sm">{item.sizeRem}</td>
                  <td className="p-4 border-b border-gray-200 font-mono text-sm">
                    {item.sizePx === 9999 ? '∞' : `${item.sizePx}px`}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <div className={`w-16 h-16 bg-blue-500 ${item.class}`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Individual Corner Examples */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Individual Corner Utilities</h2>
        <p className="text-base mb-6">
          You can also apply border radius to individual corners using these utilities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top corners */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Top Corners</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-orange-500 rounded-t-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-t-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Top left & right</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-orange-500 rounded-tl-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-tl-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Top left only</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-orange-500 rounded-tr-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-tr-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Top right only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom corners */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Bottom Corners</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-green-500 rounded-b-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-b-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Bottom left & right</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-green-500 rounded-bl-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-bl-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Bottom left only</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-green-500 rounded-br-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-br-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Bottom right only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left corners */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Left Corners</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-500 rounded-l-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-l-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Top left & bottom left</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right corners */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Right Corners</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-purple-500 rounded-r-lg"></div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">rounded-r-lg</code>
                  <p className="text-sm text-gray-600 mt-1">Top right & bottom right</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="my-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>
        <p className="mb-6">
          Common patterns using border radius utilities:
        </p>

        <div className="space-y-6">
          {/* Button Example */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Buttons</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">
                Base Rounded
              </button>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Large Rounded
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
                Fully Rounded
              </button>
            </div>
            <pre className="mt-3 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<button className="rounded">Base Rounded</button>
<button className="rounded-lg">Large Rounded</button>
<button className="rounded-full">Fully Rounded</button>`}
            </pre>
          </div>

          {/* Card Example */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-300 p-6 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Base Card</h4>
                <p className="text-gray-600 text-sm">Using rounded (0.5rem)</p>
              </div>
              <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">Medium Card</h4>
                <p className="text-gray-600 text-sm">Using rounded-lg (1rem)</p>
              </div>
              <div className="bg-white border border-gray-300 p-6 rounded-xl shadow-sm">
                <h4 className="font-semibold mb-2">Large Card</h4>
                <p className="text-gray-600 text-sm">Using rounded-xl (1.5rem)</p>
              </div>
            </div>
          </div>

          {/* Avatar Example */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Avatars & Badges</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Success
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Warning
              </div>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Error
              </div>
            </div>
            <pre className="mt-3 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`<div className="rounded-full">Avatar</div>
<span className="rounded-full">Badge</span>`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
