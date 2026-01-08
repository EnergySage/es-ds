import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="max-w-4xl px-6 py-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          EnergySage Design System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          React documentation for the EnergySage design system built with Tailwind CSS 4
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          <Link
            href="/colors"
            className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-blue-500"></div>
                <div className="w-8 h-8 rounded bg-orange-500"></div>
                <div className="w-8 h-8 rounded bg-green-500"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Colors</h2>
            <p className="text-gray-600">
              Explore the complete color palette including primary, secondary, neutrals, and feedback colors
            </p>
          </Link>

          <Link
            href="/corners"
            className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-400 rounded-none"></div>
                <div className="w-8 h-8 bg-gray-400 rounded"></div>
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Corners</h2>
            <p className="text-gray-600">
              Border radius utilities and corner styling options
            </p>
          </Link>

          <Link
            href="/spacing"
            className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-gray-400"></div>
                <div className="w-6 h-6 bg-gray-400"></div>
                <div className="w-8 h-8 bg-gray-400"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Spacing</h2>
            <p className="text-gray-600">
              Padding, margin, and gap utilities with consistent spacing scale
            </p>
          </Link>

          <Link
            href="/typography"
            className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-4xl font-bold text-gray-400">Aa</div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Typography</h2>
            <p className="text-gray-600">
              Font sizes, weights, and text styling utilities
            </p>
          </Link>
        </div>

        <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Theme Configuration</h3>
          <p className="text-blue-800">
            This documentation uses <code className="bg-blue-100 px-2 py-1 rounded">@energysage/ds-theme</code> with Tailwind CSS 4.
            All design tokens are defined in OKLCH color space for consistent color manipulation.
          </p>
        </div>
      </main>
    </div>
  );
}
