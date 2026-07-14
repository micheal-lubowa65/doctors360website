import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { useEffect, useState } from 'react';

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const markers = [
  { name: 'South Sudan', coordinates: [31.5825, 4.8594] },
  { name: 'Uganda', coordinates: [32.5825, 0.3476] },
];

export default function ProgramsMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full bg-[#0a192f] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-34, -2, 0], // Center on East Africa
          scale: 1400,
        }}
        className="w-full h-full outline-none"
      >
        <ZoomableGroup center={[35, 2]} zoom={1.5} minZoom={1} maxZoom={4} translateExtent={[[0, 0], [800, 600]]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isOperatingCountry = ['South Sudan', 'S. Sudan', 'Uganda'].includes(
                  geo.properties.name
                );

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isOperatingCountry ? '#14344b' : '#112240'}
                    stroke="#233554"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: isOperatingCountry ? '#1d4361' : '#1a2c4e', outline: 'none', transition: 'all 250ms' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates as [number, number]}>
              <circle r={8} fill="#2DD4BF" className="animate-ping opacity-60" />
              <circle r={3} fill="#2DD4BF" className="shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
              <text
                textAnchor="middle"
                y={-12}
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fill: '#94a3b8',
                  fontSize: '9px',
                  fontWeight: 600,
                  pointerEvents: 'none'
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-[#112240]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
             <div className="absolute w-2.5 h-2.5 rounded-full bg-[#2DD4BF] animate-ping opacity-60"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></div>
          </div>
          <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Active Operations</span>
        </div>
      </div>
    </div>
  );
}
