interface ColorSwatchProps {
  token: string;
  hex?: string;
  oklch?: string;
  isLight?: boolean;
  showBorder?: boolean;
}

export default function ColorSwatch({
  token,
  hex,
  oklch,
  isLight = false,
  showBorder = false,
}: ColorSwatchProps) {
  const colorValue = oklch || hex || '';
  const textColor = isLight ? 'text-gray-900' : 'text-white';
  const borderClass = showBorder ? 'border-2 border-gray-300' : '';

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full aspect-square rounded-lg ${borderClass} flex items-center justify-center ${textColor} font-mono text-sm`}
        style={{
          backgroundColor: colorValue,
        }}
      >
        {token}
      </div>
      {(hex || oklch) && (
        <p className="mt-2 text-xs text-gray-600 font-mono">{colorValue}</p>
      )}
    </div>
  );
}
