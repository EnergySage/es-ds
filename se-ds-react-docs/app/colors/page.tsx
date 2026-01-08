import ColorSwatch from '../components/ColorSwatch';

// Color scale definitions matching theme.css
const blueScale = [
  { token: 'blue-50', oklch: 'oklch(0.94 0.030 251.3)', hex: '#ddedff' },
  { token: 'blue-100', oklch: 'oklch(0.90 0.051 256.7)', hex: '#c8dfff' },
  { token: 'blue-200', oklch: 'oklch(0.83 0.085 259.5)', hex: '#a7c9ff' },
  { token: 'blue-300', oklch: 'oklch(0.76 0.122 260.8)', hex: '#85b2ff' },
  { token: 'blue-400', oklch: 'oklch(0.65 0.148 267.5)', hex: '#688aea' },
  { token: 'blue-500', oklch: 'oklch(0.54 0.177 270.5)', hex: '#4a62d4' },
  { token: 'blue-600', oklch: 'oklch(0.45 0.183 268.7)', hex: '#2e46b9' },
  { token: 'blue-700', oklch: 'oklch(0.37 0.166 267.8)', hex: '#1d3297' },
  { token: 'blue-800', oklch: 'oklch(0.32 0.137 268.2)', hex: '#162676' },
  { token: 'blue-900', oklch: 'oklch(0.27 0.128 276.0)', hex: '#1b1763' },
].reverse();

const orangeScale = [
  { token: 'orange-50', oklch: 'oklch(0.97 0.029 80.7)', hex: '#fff3df' },
  { token: 'orange-100', oklch: 'oklch(0.94 0.046 72.5)', hex: '#ffe7ca' },
  { token: 'orange-200', oklch: 'oklch(0.91 0.064 68.4)', hex: '#ffdbb5' },
  { token: 'orange-300', oklch: 'oklch(0.88 0.082 64.6)', hex: '#ffcea0' },
  { token: 'orange-400', oklch: 'oklch(0.86 0.099 62.9)', hex: '#ffc28b' },
  { token: 'orange-500', oklch: 'oklch(0.83 0.113 59.3)', hex: '#ffb67b' },
  { token: 'orange-600', oklch: 'oklch(0.81 0.131 58.1)', hex: '#ffaa66' },
  { token: 'orange-700', oklch: 'oklch(0.78 0.148 56.1)', hex: '#ff9d51' },
  { token: 'orange-800', oklch: 'oklch(0.76 0.166 56.0)', hex: '#ff9133' },
  { token: 'orange-900', oklch: 'oklch(0.70 0.165 51.3)', hex: '#ed7c2b' },
].reverse();

const grayScale = [
  { token: 'gray-50', oklch: 'oklch(0.96 0.011 274.9)', hex: '#f1f3fb' },
  { token: 'gray-100', oklch: 'oklch(0.94 0.011 274.9)', hex: '#eaecf4' },
  { token: 'gray-200', oklch: 'oklch(0.91 0.014 277.0)', hex: '#dfe1eb' },
  { token: 'gray-300', oklch: 'oklch(0.86 0.019 279.5)', hex: '#cfd1df' },
  { token: 'gray-400', oklch: 'oklch(0.74 0.023 277.4)', hex: '#a7aaba' },
  { token: 'gray-500', oklch: 'oklch(0.63 0.024 280.0)', hex: '#878999' },
  { token: 'gray-600', oklch: 'oklch(0.52 0.024 276.6)', hex: '#646776' },
  { token: 'gray-700', oklch: 'oklch(0.45 0.025 279.4)', hex: '#515362' },
  { token: 'gray-800', oklch: 'oklch(0.33 0.025 275.5)', hex: '#323543' },
  { token: 'gray-900', oklch: 'oklch(0.27 0.025 271.4)', hex: '#222633' },
].reverse();

const greenScale = [
  { token: 'success-50', oklch: 'oklch(0.92 0.045 157.5)', hex: '#ccedd8' },
  { token: 'success-500', oklch: 'oklch(0.79 0.110 152.6)', hex: '#80ce97' },
  { token: 'success-900', oklch: 'oklch(0.64 0.164 153.1)', hex: '#00a759' },
].reverse();

const yellowScale = [
  { token: 'warning-50', oklch: 'oklch(0.95 0.049 95.9)', hex: '#f8efca' },
  { token: 'warning-500', oklch: 'oklch(0.90 0.115 96.8)', hex: '#f4df83' },
  { token: 'warning-900', oklch: 'oklch(0.85 0.172 93.4)', hex: '#f4ca11' },
].reverse();

const redScale = [
  { token: 'error-50', oklch: 'oklch(0.91 0.036 9.3)', hex: '#f7d7db' },
  { token: 'error-500', oklch: 'oklch(0.80 0.087 11.1)', hex: '#efa6af' },
  { token: 'error-900', oklch: 'oklch(0.60 0.197 18.9)', hex: '#de3c50' },
].reverse();

const coreColors = [
  { token: 'white', hex: '#ffffff', name: 'ES white' },
  { token: 'blue-100', oklch: 'oklch(0.90 0.051 256.7)', hex: '#c8dfff', name: 'ES soft blue' },
  { token: 'blue-300', oklch: 'oklch(0.76 0.122 260.8)', hex: '#85b2ff', name: 'ES medium blue' },
  { token: 'blue-900', oklch: 'oklch(0.27 0.128 276.0)', hex: '#1b1763', name: 'ES dark blue' },
  { token: 'orange-800', oklch: 'oklch(0.76 0.166 56.0)', hex: '#ff9133', name: 'ES warm orange' },
];

// Complete color palette for table view
const colorPalette = {
  blue: {
    50: '#ddedff',
    100: '#c8dfff',
    200: '#a7c9ff',
    300: '#85b2ff',
    400: '#688aea',
    500: '#4a62d4',
    600: '#2e46b9',
    700: '#1d3297',
    800: '#162676',
    900: '#1b1763',
    950: '#0f0d3a',
  },
  orange: {
    50: '#fff3df',
    100: '#ffe7ca',
    200: '#ffdbb5',
    300: '#ffcea0',
    400: '#ffc28b',
    500: '#ffb67b',
    600: '#ffaa66',
    700: '#ff9d51',
    800: '#ff9133',
    900: '#ed7c2b',
    950: '#c25e1a',
  },
  gray: {
    50: '#f1f3fb',
    100: '#eaecf4',
    200: '#dfe1eb',
    300: '#cfd1df',
    400: '#a7aaba',
    500: '#878999',
    600: '#646776',
    700: '#515362',
    800: '#323543',
    900: '#222633',
    950: '#16181f',
  },
  green: {
    50: '#ccedd8',
    100: '#b8e5c7',
    200: '#a3ddb6',
    300: '#8ed5a5',
    400: '#87d19e',
    500: '#80ce97',
    600: '#6bb982',
    700: '#57a56e',
    800: '#4a9460',
    900: '#00a759',
    950: '#008446',
  },
  yellow: {
    50: '#f8efca',
    100: '#f6eab4',
    200: '#f5e5a0',
    300: '#f4e08d',
    400: '#f4dd7e',
    500: '#f4df83',
    600: '#f4d86a',
    700: '#f4d253',
    800: '#f4cd3d',
    900: '#f4ca11',
    950: '#cda70e',
  },
  red: {
    50: '#f7d7db',
    100: '#f4c3c9',
    200: '#f1afb7',
    300: '#ee9ba5',
    400: '#ec8a97',
    500: '#efa6af',
    600: '#e87081',
    700: '#e35164',
    800: '#e0404f',
    900: '#de3c50',
    950: '#b5303f',
  },
};

// Additional standard Tailwind colors not in EnergySage DS
const tailwindColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
    950: '#1a2e05',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519',
  },
};

export default function ColorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-4">Colors</h1>
      <p className="text-lg mb-4">
        Below you will find our named color definitions. They are meant to convey the meaning of the color using a
        defined naming convention. When working, please use these color definitions and try to avoid introducing
        new unnamed colors.
      </p>
      <p className="text-base mb-8">
        All colors have Tailwind CSS utility classes associated with them.{' '}
        <code className="bg-gray-100 px-2 py-1 rounded">text-{'{COLOR_NAME}'}</code> for text color and{' '}
        <code className="bg-gray-100 px-2 py-1 rounded">bg-{'{COLOR_NAME}'}</code> for background color.
      </p>

      {/* Color Palette Table */}
      <section className="my-12 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">EnergySage Design System Colors</h2>
        <p className="text-base mb-6 text-gray-600">
          These are the primary colors defined in the EnergySage design system. Use these colors first for consistency with the brand.
        </p>
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-[120px_repeat(11,1fr)] gap-0 border border-gray-300 rounded-lg overflow-hidden">
            {/* Header Row */}
            <div className="bg-gray-100 p-3 font-semibold text-sm border-r border-b border-gray-300 sticky left-0 z-10">
              Color
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div key={shade} className="bg-gray-100 p-3 text-center font-semibold text-sm border-b border-gray-300">
                {shade}
              </div>
            ))}

            {/* Blue Row */}
            <div className="bg-gray-50 p-3 font-medium text-sm border-r border-b border-gray-300 sticky left-0 z-10 flex items-center">
              blue
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div
                key={shade}
                className="group relative h-12 border-b border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: colorPalette.blue[shade as keyof typeof colorPalette.blue] }}
                title={`blue-${shade}: ${colorPalette.blue[shade as keyof typeof colorPalette.blue]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                    {colorPalette.blue[shade as keyof typeof colorPalette.blue]}
                  </span>
                </div>
              </div>
            ))}

            {/* Orange Row */}
            <div className="bg-gray-50 p-3 font-medium text-sm border-r border-b border-gray-300 sticky left-0 z-10 flex items-center">
              orange
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div
                key={shade}
                className="group relative h-12 border-b border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: colorPalette.orange[shade as keyof typeof colorPalette.orange] }}
                title={`orange-${shade}: ${colorPalette.orange[shade as keyof typeof colorPalette.orange]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                    {colorPalette.orange[shade as keyof typeof colorPalette.orange]}
                  </span>
                </div>
              </div>
            ))}

            {/* Gray Row */}
            <div className="bg-gray-50 p-3 font-medium text-sm border-r border-b border-gray-300 sticky left-0 z-10 flex items-center">
              gray
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div
                key={shade}
                className="group relative h-12 border-b border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: colorPalette.gray[shade as keyof typeof colorPalette.gray] }}
                title={`gray-${shade}: ${colorPalette.gray[shade as keyof typeof colorPalette.gray]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                    {colorPalette.gray[shade as keyof typeof colorPalette.gray]}
                  </span>
                </div>
              </div>
            ))}

            {/* Green Row */}
            <div className="bg-gray-50 p-3 font-medium text-sm border-r border-b border-gray-300 sticky left-0 z-10 flex items-center">
              green
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div
                key={shade}
                className="group relative h-12 border-b border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: colorPalette.green[shade as keyof typeof colorPalette.green] }}
                title={`green-${shade}: ${colorPalette.green[shade as keyof typeof colorPalette.green]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                    {colorPalette.green[shade as keyof typeof colorPalette.green]}
                  </span>
                </div>
              </div>
            ))}

            {/* Yellow Row */}
            <div className="bg-gray-50 p-3 font-medium text-sm border-r border-b border-gray-300 sticky left-0 z-10 flex items-center">
              yellow
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div
                key={shade}
                className="group relative h-12 border-b border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: colorPalette.yellow[shade as keyof typeof colorPalette.yellow] }}
                title={`yellow-${shade}: ${colorPalette.yellow[shade as keyof typeof colorPalette.yellow]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                    {colorPalette.yellow[shade as keyof typeof colorPalette.yellow]}
                  </span>
                </div>
              </div>
            ))}

            {/* Red Row */}
            <div className="bg-gray-50 p-3 font-medium text-sm border-r sticky left-0 z-10 flex items-center">
              red
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div
                key={shade}
                className="group relative h-12 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: colorPalette.red[shade as keyof typeof colorPalette.red] }}
                title={`red-${shade}: ${colorPalette.red[shade as keyof typeof colorPalette.red]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                    {colorPalette.red[shade as keyof typeof colorPalette.red]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Hover over any color swatch to see its hex value. Click to copy (coming soon).
        </p>
      </section>

      {/* Additional Tailwind Colors */}
      <section className="my-12 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Additional Tailwind CSS Colors</h2>
        <p className="text-base mb-6 text-gray-600">
          These standard Tailwind CSS colors are also available if needed, though preference should be given to the EnergySage design system colors above.
        </p>
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-[120px_repeat(11,1fr)] gap-0 border border-gray-300 rounded-lg overflow-hidden">
            {/* Header Row */}
            <div className="bg-gray-100 p-3 font-semibold text-sm border-r border-b border-gray-300 sticky left-0 z-10">
              Color
            </div>
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div key={shade} className="bg-gray-100 p-3 text-center font-semibold text-sm border-b border-gray-300">
                {shade}
              </div>
            ))}

            {/* Color Rows */}
            {Object.entries(tailwindColors).map(([colorName, shades], idx) => (
              <>
                <div
                  key={colorName}
                  className={`bg-gray-50 p-3 font-medium text-sm border-r ${idx === Object.keys(tailwindColors).length - 1 ? '' : 'border-b'} border-gray-300 sticky left-0 z-10 flex items-center`}
                >
                  {colorName}
                </div>
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
                  <div
                    key={`${colorName}-${shade}`}
                    className={`group relative h-12 ${idx === Object.keys(tailwindColors).length - 1 ? '' : 'border-b'} border-gray-300 cursor-pointer hover:scale-105 transition-transform`}
                    style={{ backgroundColor: shades[shade as keyof typeof shades] }}
                    title={`${colorName}-${shade}: ${shades[shade as keyof typeof shades]}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-mono bg-black/75 text-white px-2 py-1 rounded">
                        {shades[shade as keyof typeof shades]}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Hover over any color swatch to see its hex value.
        </p>
      </section>

      {/* Core Colors */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Core colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {coreColors.map(({ token, hex, oklch, name }) => (
            <div key={token} className="text-center">
              <ColorSwatch
                token={token}
                hex={hex}
                oklch={oklch}
                isLight={['white', 'blue-100', 'blue-300', 'orange-800'].includes(token)}
                showBorder={token === 'white'}
              />
              <p className="font-semibold mt-2 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Primary - Blue */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Primary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {blueScale.map(({ token, hex, oklch }) => (
            <div key={token} className="text-center">
              <ColorSwatch
                token={token}
                hex={hex}
                oklch={oklch}
                isLight={['blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400'].includes(token)}
                showBorder={['blue-50', 'blue-100'].includes(token)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Secondary - Orange */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Secondary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {orangeScale.map(({ token, hex, oklch }) => (
            <div key={token} className="text-center">
              <ColorSwatch
                token={token}
                hex={hex}
                oklch={oklch}
                isLight={true}
                showBorder={['orange-50', 'orange-100'].includes(token)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Neutrals - Gray */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Neutrals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {grayScale.map(({ token, hex, oklch }) => (
            <div key={token} className="text-center">
              <ColorSwatch
                token={token}
                hex={hex}
                oklch={oklch}
                isLight={['gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500'].includes(token)}
                showBorder={['gray-50', 'gray-100'].includes(token)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Colors */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Feedback</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Success */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Success</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {greenScale.map(({ token, hex, oklch }) => (
                <div key={token} className="text-center">
                  <ColorSwatch
                    token={token}
                    hex={hex}
                    oklch={oklch}
                    isLight={true}
                    showBorder={token === 'success-50'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Warning</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {yellowScale.map(({ token, hex, oklch }) => (
                <div key={token} className="text-center">
                  <ColorSwatch
                    token={token}
                    hex={hex}
                    oklch={oklch}
                    isLight={true}
                    showBorder={token === 'warning-50'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Error</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {redScale.map(({ token, hex, oklch }) => (
                <div key={token} className="text-center">
                  <ColorSwatch
                    token={token}
                    hex={hex}
                    oklch={oklch}
                    isLight={true}
                    showBorder={token === 'error-50'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="my-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>
        <p className="mb-4">
          The theme provides both literal color names and semantic aliases. You can use either approach:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Literal Color Names</h3>
            <div className="bg-white p-4 rounded border">
              <code className="block mb-2">className=&quot;text-blue-600 bg-blue-50&quot;</code>
              <div className="text-blue-600 bg-blue-50 p-3 rounded">
                This text uses literal blue color names
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Semantic Color Names</h3>
            <div className="bg-white p-4 rounded border">
              <code className="block mb-2">className=&quot;text-primary-600 bg-primary-50&quot;</code>
              <div className="text-primary-600 bg-primary-50 p-3 rounded">
                This text uses semantic primary color names (which reference blue)
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Feedback Colors</h3>
            <div className="bg-white p-4 rounded border space-y-2">
              <div className="text-success-900 bg-success-50 p-3 rounded">
                Success: Operation completed successfully
              </div>
              <div className="text-warning-900 bg-warning-50 p-3 rounded">
                Warning: Please review your input
              </div>
              <div className="text-danger-900 bg-danger-50 p-3 rounded">
                Error: Something went wrong
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Mapping Reference */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">Color Mapping Reference</h2>
        <div className="bg-white border rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Semantic Name</th>
                <th className="text-left py-2 px-4">Maps To</th>
                <th className="text-left py-2 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">primary-*</code>
                </td>
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">blue-*</code>
                </td>
                <td className="py-2 px-4">Main brand color</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">secondary-*</code>
                </td>
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">orange-*</code>
                </td>
                <td className="py-2 px-4">Secondary brand color</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">success-*</code>
                </td>
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">green-*</code>
                </td>
                <td className="py-2 px-4">Positive feedback, success states</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">warning-*</code>
                </td>
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">yellow-*</code>
                </td>
                <td className="py-2 px-4">Warning states, alerts</td>
              </tr>
              <tr>
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">danger-*</code>
                </td>
                <td className="py-2 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">red-*</code>
                </td>
                <td className="py-2 px-4">Error states, destructive actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
