import { useState } from 'react'

export default function FurniturePreview({ dimensions, color, material, furnitureType }) {
  const [controlsEnabled, setControlsEnabled] = useState(true)

  return (
    <div className="relative h-full">
      {/* 3D Preview को पूरी तरह हटा दिया गया */}
      
      {/* केवल सूचना (Overlay info) रखें */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="inline-block bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-lg font-semibold">{furnitureType} Preview</p>
          <p>Dimensions: {dimensions.length}ft × {dimensions.width}ft × {dimensions.height}ft</p>
          <p>Material: {material}</p>
          <p>Color: <span className="inline-block w-4 h-4 rounded-full border border-white" style={{ backgroundColor: color }} /></p>
        </div>
      </div>
    </div>
  )
}