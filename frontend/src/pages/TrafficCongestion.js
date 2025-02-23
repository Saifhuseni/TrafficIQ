import React, { useState, useRef, useEffect } from "react";
import { MapPin, Loader, AlertCircle, Map as MapIcon } from 'lucide-react';

// Ensure API key is stored in .env file as REACT_APP_TOMTOM_API_KEY
const API_KEY = process.env.REACT_APP_TOMTOM_API_KEY;

const TrafficCongestion = () => {
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showMap, setShowMap] = useState(false);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (showMap && !map) {
            // Initialize map
            const tt = window.tt;
            if (!tt) {
                setError("TomTom Maps SDK not loaded. Please check your configuration.");
                return;
            }

            const newMap = tt.map({
                key: API_KEY,
                container: mapRef.current,
                center: [-73.9857, 40.7577], // Default to NYC
                zoom: 13
            });

            newMap.on('click', (event) => {
                const { lng, lat } = event.lngLat;
                setLat(lat.toFixed(4));
                setLon(lng.toFixed(4));

                // Update marker
                if (marker) {
                    marker.remove();
                }
                const newMarker = new tt.Marker()
                    .setLngLat([lng, lat])
                    .addTo(newMap);
                setMarker(newMarker);
            });

            setMap(newMap);

            return () => {
                if (map) {
                    map.remove();
                }
            };
        }
    }, [showMap]);

    const fetchTrafficData = async () => {
        // Validate latitude and longitude
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);

        if (!lat || !lon || isNaN(latNum) || isNaN(lonNum)) {
            setError("Please enter valid numeric latitude and longitude.");
            return;
        }

        if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
            setError("Latitude must be between -90 and 90, Longitude between -180 and 180.");
            return;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
            // Use zoom level 15 for detailed road segment data
            const response = await fetch(
                `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/15/json?key=${API_KEY}&point=${latNum},${lonNum}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            // Check if flowSegmentData exists in the response
            if (result.flowSegmentData) {
                setData(result.flowSegmentData);
            } else {
                setError("No traffic data available for this location. It might be outside coverage or not near a road.");
            }
        } catch (err) {
            setError(`Error fetching traffic data: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const calculateCongestion = (currentSpeed, freeFlowSpeed) => {
        if (!freeFlowSpeed || freeFlowSpeed === 0) return "N/A (Invalid free flow speed)";
        const congestionPercentage = ((freeFlowSpeed - currentSpeed) / freeFlowSpeed) * 100;
        
        // Handle cases where currentSpeed exceeds freeFlowSpeed (no congestion)
        if (congestionPercentage <= 0) return "0% (No congestion)";
        
        // Categorize congestion levels
        const roundedPercentage = congestionPercentage.toFixed(2);
        let congestionCategory = "";
        if (congestionPercentage <= 20) congestionCategory = "Light congestion";
        else if (congestionPercentage <= 50) congestionCategory = "Moderate congestion";
        else congestionCategory = "Heavy congestion";

        return `${roundedPercentage}% (${congestionCategory})`;
    };

    return (
        <div className="min-h-screen w-screen bg-slate-900 flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Traffic<span className="text-blue-400">IQ</span>.
                </h1>
                <p className="text-slate-400">Enter location coordinates for traffic congestion prediction</p>
            </div>

            <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8">
                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center text-red-500">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>{error}</span>
                    </div>
                )}
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Latitude</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                placeholder="e.g., 40.7577"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Longitude</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={lon}
                                onChange={(e) => setLon(e.target.value)}
                                placeholder="e.g., -73.9857"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={fetchTrafficData}
                            disabled={loading}
                            className={`flex-1 py-3 px-4 flex justify-center rounded-lg text-white text-sm font-semibold transition-colors duration-200
                                ${loading ? 'bg-blue-500/50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {loading ? <Loader className="h-5 w-5 animate-spin" /> : 'Predict Congestion'}
                        </button>
                        <button
                            onClick={() => setShowMap(!showMap)}
                            className="py-3 px-4 flex justify-center rounded-lg text-white text-sm font-semibold bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
                        >
                            <MapIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {showMap && (
                    <div className="mt-4">
                        <div 
                            ref={mapRef} 
                            className="w-full h-64 rounded-lg overflow-hidden"
                        />
                        <p className="text-sm text-slate-400 mt-2">
                            Click on the map to select coordinates
                        </p>
                    </div>
                )}

                {data && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">Traffic Data</h3>
                        <p className="text-slate-200"><strong>Current Speed:</strong> {data.currentSpeed} km/h</p>
                        <p className="text-slate-200"><strong>Free Flow Speed:</strong> {data.freeFlowSpeed} km/h</p>
                        <p className="text-slate-200">
                            <strong>Congestion Level:</strong> {calculateCongestion(data.currentSpeed, data.freeFlowSpeed)}
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                            Note: Data reflects the nearest road segment to the provided coordinates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrafficCongestion;