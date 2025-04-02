// components/DesignPreview.js
export default function FurniturePreview({ dimensions, color, material, furnitureType }) {
  // Calculate sizes based on mobile viewport
  const previewSize = Math.min(window.innerWidth * 0.8, 300); // Max 300px width
  const scaleFactor = previewSize / Math.max(dimensions.width, 1); // Prevent division by zero

  return (
    <div className="h-full w-full p-4 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{furnitureType}</h2>
        <p className="text-sm text-gray-500">Product Preview</p>
      </div>

      {/* 2D Representation Container */}
      <div className="flex justify-center mb-6">
        <div 
          className="relative border border-gray-200 rounded-lg overflow-hidden"
          style={{
            width: `${dimensions.width * scaleFactor}px`,
            height: `${dimensions.height * scaleFactor}px`,
            backgroundColor: color,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Depth indicator (3D effect) */}
          <div 
            className="absolute bottom-0 right-0 bg-black bg-opacity-10"
            style={{
              width: `${dimensions.length * scaleFactor * 0.5}px`,
              height: '100%',
              transform: 'skewX(-45deg)',
              transformOrigin: 'bottom right'
            }}
          />
        </div>
      </div>

      {/* Specifications Card - Mobile Optimized */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Specifications</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Length:</span>
            <span className="font-medium">{dimensions.length}ft</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Width:</span>
            <span className="font-medium">{dimensions.width}ft</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Height:</span>
            <span className="font-medium">{dimensions.height}ft</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Material:</span>
            <span className="font-medium capitalize">{material}</span>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-600">Color:</span>
            <div className="flex items-center">
              <span 
                className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-200"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs">Selected</span>
            </div>
          </div>
        </div>

        {/* Scale indicator for mobile */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-xs">
          <div className="flex justify-between text-gray-500 mb-1">
            <span>Scale:</span>
            <span>1ft ≈ {Math.round(scaleFactor)}px</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-blue-400 mr-1"></div>
            <span>1ft</span>
          </div>
        </div>
      </div>
    </div>
  )
}