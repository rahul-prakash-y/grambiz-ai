import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  GoogleMap, 
  useJsApiLoader, 
  MarkerF, 
  CircleF, 
  InfoWindowF 
} from '@react-google-maps/api';
import { 
  MapPin, 
  Star, 
  Navigation, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Store, 
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Key,
  Info,
  RefreshCw,
  Eye
} from 'lucide-react';
import { TAMIL_NADU_RURAL_CENTER } from '../../services/googlePlacesService';

// Default container style for Google Maps
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '520px',
  borderRadius: '1rem'
};

// Subtle custom map styling optimized for clarity in rural / suburban regions
const cleanMapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'simplified' }]
    },
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#cbe6f7' }]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{ color: '#e8f5e9' }]
    }
  ]
};

const LIBRARIES = ['places', 'geometry'];

export default function GoogleCompetitorMap({
  center = TAMIL_NADU_RURAL_CENTER,
  competitors = [],
  radiusKm = 5,
  selectedCompetitor = null,
  onSelectCompetitor,
  proposedIdeaTitle = "Your Proposed Enterprise",
  lang = 'en',
  apiKey = '',
  onOpenApiKeyModal
}) {
  const [mapInstance, setMapInstance] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapMode, setMapMode] = useState(apiKey ? 'google' : 'interactive'); // 'google' or 'interactive'
  const [zoomLevel, setZoomLevel] = useState(radiusKm === 1 ? 15 : radiusKm === 5 ? 13 : 11);

  // Load Google Maps API script
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES
  });

  // Calculate zoom based on radius
  useEffect(() => {
    let targetZoom = 13;
    if (radiusKm <= 1) targetZoom = 15;
    else if (radiusKm <= 5) targetZoom = 13;
    else targetZoom = 11;
    
    setZoomLevel(targetZoom);
    if (mapInstance) {
      mapInstance.setZoom(targetZoom);
      mapInstance.panTo({ lat: center.lat, lng: center.lng });
    }
  }, [radiusKm, center, mapInstance]);

  // Synchronize when a competitor is selected from the side panel
  useEffect(() => {
    if (selectedCompetitor) {
      setActiveMarker(selectedCompetitor);
      if (mapInstance) {
        mapInstance.panTo({ lat: selectedCompetitor.lat, lng: selectedCompetitor.lng });
      }
    }
  }, [selectedCompetitor, mapInstance]);

  const onLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMapInstance(null);
  }, []);

  // Radius in meters for CircleF
  const radiusMeters = radiusKm * 1000;

  // Custom SVG Marker Generator for Competitors
  const getMarkerIcon = (comp, isSelected) => {
    let pinColor = '#f59e0b'; // Amber for medium
    if (comp.threat === 'high') pinColor = '#ef4444'; // Red for high
    if (comp.threat === 'low') pinColor = '#10b981'; // Green for low

    const scale = isSelected ? 1.3 : 1.0;

    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: pinColor,
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      scale: scale * 1.6,
      anchor: typeof window !== 'undefined' && window.google?.maps 
        ? new window.google.maps.Point(12, 22) 
        : undefined
    };
  };

  // Center Proposed Business Location Marker
  const getCenterMarkerIcon = () => ({
    path: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z',
    fillColor: '#059669', // Emerald
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: '#ffffff',
    scale: 1.8,
    anchor: typeof window !== 'undefined' && window.google?.maps 
      ? new window.google.maps.Point(12, 12) 
      : undefined
  });

  const activeCenter = { lat: center.lat || 9.7346, lng: center.lng || 77.7984 };

  return (
    <div className="relative w-full h-full min-h-[540px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Center Location Tag */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-2 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-extrabold text-slate-800">
            {center.name || 'Kallupatti Village, Madurai'}
          </span>
          <span className="text-slate-400">|</span>
          <span className="font-mono text-[11px] text-slate-500">
            {activeCenter.lat.toFixed(4)}°N, {activeCenter.lng.toFixed(4)}°E
          </span>
        </div>

        {/* View Switcher & API Key Info */}
        <div className="pointer-events-auto flex items-center gap-2">
          {isLoaded && !loadError && (
            <div className="join bg-white/95 backdrop-blur-md p-0.5 rounded-xl border border-slate-200/80 shadow-md">
              <button
                onClick={() => setMapMode('google')}
                className={`btn btn-xs join-item font-bold ${
                  mapMode === 'google' ? 'btn-primary text-white' : 'btn-ghost text-slate-700'
                }`}
              >
                Google Map
              </button>
              <button
                onClick={() => setMapMode('interactive')}
                className={`btn btn-xs join-item font-bold ${
                  mapMode === 'interactive' ? 'btn-primary text-white' : 'btn-ghost text-slate-700'
                }`}
              >
                Radar Canvas
              </button>
            </div>
          )}

          <button
            onClick={onOpenApiKeyModal}
            className="btn btn-xs bg-white/95 backdrop-blur-md hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-md font-bold rounded-xl gap-1"
            title="Google Places API Key Settings"
          >
            <Key className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">
              {apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'API Key Active' : 'API Key Config'}
            </span>
          </button>
        </div>
      </div>

      {/* Map Content: Google Map (via @react-google-maps/api) or Interactive Radar Canvas */}
      {isLoaded && !loadError && mapMode === 'google' ? (
        <div className="w-full h-full flex-1">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={activeCenter}
            zoom={zoomLevel}
            options={cleanMapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Search Radius Circle Overlay */}
            <CircleF
              center={activeCenter}
              radius={radiusMeters}
              options={{
                strokeColor: '#0284c7', // Sky-600
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#38bdf8', // Sky-400
                fillOpacity: 0.12,
                clickable: false
              }}
            />

            {/* Proposed Business Location Pin */}
            <MarkerF
              position={activeCenter}
              icon={getCenterMarkerIcon()}
              title={`Proposed Location: ${proposedIdeaTitle}`}
              onClick={() => {
                setActiveMarker({
                  id: 'proposed-business',
                  name: `Proposed: ${proposedIdeaTitle}`,
                  nameTa: `முன்மொழியப்பட்ட தொழில் மையம்`,
                  address: `${center.name || 'Kallupatti Village'}, ${center.district || 'Madurai'}`,
                  category: 'Your Enterprise',
                  rating: 5.0,
                  userRatingCount: 1,
                  status: 'Planning Phase',
                  threat: 'self',
                  isCenter: true
                });
              }}
            />

            {/* Competitor Business Markers */}
            {competitors.map((comp) => {
              const isSelected = selectedCompetitor?.id === comp.id;
              return (
                <MarkerF
                  key={comp.id}
                  position={{ lat: comp.lat, lng: comp.lng }}
                  icon={getMarkerIcon(comp, isSelected)}
                  title={`${comp.name} (${comp.distanceText})`}
                  onClick={() => {
                    setActiveMarker(comp);
                    if (onSelectCompetitor) onSelectCompetitor(comp);
                  }}
                />
              );
            })}

            {/* InfoWindow for Clicked Business Marker */}
            {activeMarker && (
              <InfoWindowF
                position={{
                  lat: activeMarker.lat || activeCenter.lat,
                  lng: activeMarker.lng || activeCenter.lng
                }}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="p-1 max-w-[260px] text-slate-800">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="font-extrabold text-sm text-slate-900 leading-tight">
                      {lang === 'ta' && activeMarker.nameTa ? activeMarker.nameTa : activeMarker.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-2">
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{activeMarker.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({activeMarker.userRatingCount || 0})
                      </span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded text-[11px]">
                      {activeMarker.distanceText || `${activeMarker.distanceKm} km`}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                    {lang === 'ta' && activeMarker.addressTa ? activeMarker.addressTa : activeMarker.address}
                  </p>

                  {activeMarker.marketGap && (
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/70 text-[10px] text-amber-900 mb-2">
                      <strong className="block text-amber-950 font-bold mb-0.5">
                        {lang === 'ta' ? 'சந்தை இடைவெளி வாய்ப்பு:' : 'GramBiz Gap Insight:'}
                      </strong>
                      {lang === 'ta' && activeMarker.marketGapTa ? activeMarker.marketGapTa : activeMarker.marketGap}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                    <span className="font-bold text-slate-600">
                      {activeMarker.pricingDesc || 'Standard'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      activeMarker.threat === 'high' ? 'bg-rose-100 text-rose-800' :
                      activeMarker.threat === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {activeMarker.threat?.toUpperCase()} THREAT
                    </span>
                  </div>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>
      ) : (
        /* Interactive Topographic Radar Canvas (Fallback & Standalone Visual Mode) */
        <InteractiveRadarCanvas
          center={activeCenter}
          competitors={competitors}
          radiusKm={radiusKm}
          selectedCompetitor={selectedCompetitor}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          onSelectCompetitor={onSelectCompetitor}
          proposedIdeaTitle={proposedIdeaTitle}
          lang={lang}
          loadError={loadError}
          onOpenApiKeyModal={onOpenApiKeyModal}
        />
      )}

      {/* Map Legend Overlay at Bottom */}
      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none flex flex-wrap items-center justify-between gap-2">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
            <span className="text-slate-700 font-semibold">{lang === 'ta' ? 'உங்கள் இடம்' : 'Your Hub'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-700 font-semibold">{lang === 'ta' ? 'அதிக போட்டி' : 'High Threat'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-700 font-semibold">{lang === 'ta' ? 'மிதமான' : 'Moderate'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-700 font-semibold">{lang === 'ta' ? 'வாய்ப்பு' : 'Opportunity'}</span>
          </div>
        </div>

        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md text-xs font-mono flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
          <span>Radius: <strong className="text-sky-300">{radiusKm} km</strong></span>
          <span className="text-slate-500">•</span>
          <span>Pins: <strong className="text-emerald-300">{competitors.length}</strong></span>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Radar & Topographic Canvas
 * Renders high-fidelity rural Tamil Nadu layout with interactive markers, concentric radius rings,
 * pulsing user hub, and interactive popups.
 */
function InteractiveRadarCanvas({
  center,
  competitors,
  radiusKm,
  selectedCompetitor,
  activeMarker,
  setActiveMarker,
  onSelectCompetitor,
  proposedIdeaTitle,
  lang,
  loadError,
  onOpenApiKeyModal
}) {
  const containerRef = useRef(null);

  // Convert GPS coordinates into relative percentage coordinates on the radar canvas
  // Center is always (50%, 50%).
  // Latitude offset goes north/south (-y/+y), longitude offset goes east/west (+x/-x).
  const maxCoordinateSpan = radiusKm * 0.012; // Dynamic scaling based on selected radius

  const getPositionStyle = (lat, lng) => {
    const dLat = lat - center.lat;
    const dLng = lng - center.lng;

    // Scale to percentage (50% is center)
    const xPct = 50 + (dLng / maxCoordinateSpan) * 40;
    const yPct = 50 - (dLat / maxCoordinateSpan) * 40;

    return {
      left: `${Math.min(92, Math.max(8, xPct))}%`,
      top: `${Math.min(92, Math.max(8, yPct))}%`
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[520px] bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 overflow-hidden select-none"
    >
      {/* Topographic Background Grid & Radar Sweep */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, transparent 70%),
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px'
        }}
      />

      {/* Simulated Rural Tamil Nadu Geography: Highways, Canals & Farmlands */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0,260 Q 200,240 400,270 T 800,230 T 1200,290" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
        <path d="M 320,0 Q 340,300 480,450 T 600,800" fill="none" stroke="#94a3b8" strokeWidth="4" />
        <path d="M 0,380 Q 500,420 800,360 T 1400,400" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4" />
        <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.4" />
      </svg>

      {/* Active Radius Ring Boundary */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400/40 bg-sky-500/5 pointer-events-none transition-all duration-700 ease-out shadow-[0_0_50px_rgba(14,165,233,0.15)]"
        style={{
          width: radiusKm === 1 ? '72%' : radiusKm === 5 ? '82%' : '92%',
          height: radiusKm === 1 ? '72%' : radiusKm === 5 ? '82%' : '92%'
        }}
      >
        <span className="absolute top-2 right-4 text-[10px] font-mono text-sky-400/80 font-bold uppercase tracking-wider">
          {radiusKm} KM BOUNDARY
        </span>
      </div>

      {/* Proposed Center Location Marker */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        onClick={() => {
          setActiveMarker({
            id: 'center-location',
            name: proposedIdeaTitle || 'Your Proposed Business',
            nameTa: 'உங்கள் முன்மொழியப்பட்ட தொழில் மையம்',
            address: `${center.name}, ${center.district}`,
            category: 'Proposed Hub',
            rating: 5.0,
            userRatingCount: 1,
            distanceText: 'Center Point (0 km)',
            status: 'Strategic Launch Site',
            threat: 'self',
            marketGap: 'Optimal location with strong highway connectivity, low raw material procurement costs and zero direct organic competitors.'
          });
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 animate-ping absolute" />
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/50 ring-4 ring-white/30 transition-transform group-hover:scale-110">
            <Store className="w-4 h-4 text-white" />
          </div>
          <div className="absolute top-10 whitespace-nowrap bg-emerald-950/90 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/40 shadow-md">
            {lang === 'ta' ? 'உங்கள் இடம் (மையம்)' : 'Proposed Hub'}
          </div>
        </div>
      </div>

      {/* Competitor Markers on Radar Canvas */}
      {competitors.map((comp) => {
        const isSelected = selectedCompetitor?.id === comp.id || activeMarker?.id === comp.id;
        const pos = getPositionStyle(comp.lat, comp.lng);

        let badgeBg = 'bg-amber-500';
        let glowColor = 'shadow-amber-500/50';
        if (comp.threat === 'high') {
          badgeBg = 'bg-rose-500';
          glowColor = 'shadow-rose-500/50';
        } else if (comp.threat === 'low') {
          badgeBg = 'bg-emerald-500';
          glowColor = 'shadow-emerald-500/50';
        }

        return (
          <div
            key={comp.id}
            style={pos}
            onClick={() => {
              setActiveMarker(comp);
              if (onSelectCompetitor) onSelectCompetitor(comp);
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-15 cursor-pointer group transition-all duration-300 ${
              isSelected ? 'scale-125 z-30' : 'hover:scale-115'
            }`}
          >
            <div className="relative flex flex-col items-center">
              {/* Pin Bubble */}
              <div 
                className={`w-7 h-7 rounded-full ${badgeBg} text-white flex items-center justify-center shadow-lg ${glowColor} ring-2 ring-white/80 transition-all`}
              >
                <MapPin className="w-3.5 h-3.5 fill-white/80" />
              </div>

              {/* Pin Distance & Name Tag */}
              <div className="mt-1 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[9px] font-bold border border-slate-700/80 shadow flex items-center gap-1">
                <span>{comp.distanceText}</span>
                <span className="text-amber-400">★{comp.rating}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Active Marker Info Popup on Radar Canvas */}
      {activeMarker && (
        <div 
          className="absolute z-40 bg-white/98 text-slate-800 rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 max-w-xs w-80 animate-in fade-in zoom-in-95 duration-200"
          style={{
            bottom: '60px',
            right: '20px'
          }}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                {lang === 'ta' && activeMarker.nameTa ? activeMarker.nameTa : activeMarker.name}
              </span>
              <span className="text-[11px] text-slate-500">
                {lang === 'ta' && activeMarker.addressTa ? activeMarker.addressTa : activeMarker.address}
              </span>
            </div>
            <button 
              onClick={() => setActiveMarker(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1.5 py-0.5 rounded hover:bg-slate-100"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs mb-2">
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{activeMarker.rating}</span>
              <span className="text-slate-400 font-normal">
                ({activeMarker.userRatingCount || 0})
              </span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded text-[11px]">
              {activeMarker.distanceText || `${activeMarker.distanceKm} km`}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
              activeMarker.threat === 'high' ? 'bg-rose-100 text-rose-800' :
              activeMarker.threat === 'medium' ? 'bg-amber-100 text-amber-800' :
              'bg-emerald-100 text-emerald-800'
            }`}>
              {activeMarker.threat?.toUpperCase()}
            </span>
          </div>

          {activeMarker.marketGap && (
            <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-950 mb-2 leading-relaxed">
              <strong className="block text-amber-900 font-extrabold mb-0.5">
                {lang === 'ta' ? '💡 சந்தை இடைவெளி உத்தி:' : '💡 GramBiz AI Opportunity Gap:'}
              </strong>
              {lang === 'ta' && activeMarker.marketGapTa ? activeMarker.marketGapTa : activeMarker.marketGap}
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500 font-medium">
              {activeMarker.status || 'Active'}
            </span>
            {activeMarker.phone && (
              <span className="text-sky-700 font-semibold font-mono">
                {activeMarker.phone}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Floating Mode Notice */}
      <div className="absolute top-14 left-3 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-white text-[11px] flex items-center gap-2">
        <Layers className="w-3.5 h-3.5 text-sky-400" />
        <span>Tamil Nadu Rural Topographic Radar (Kallupatti Taluk)</span>
      </div>
    </div>
  );
}
