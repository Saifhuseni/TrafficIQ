import React, { useState } from "react";
import axios from "axios";
import { File, AlertCircle } from 'lucide-react';

const PredictionForm = () => {
    const [video, setVideo] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(''); 
        setPrediction(null);
      
        if (!video) {
            setErrors('Please select a video file.');
            return;
        }

        const formData = new FormData();
        formData.append("file", video);

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/process_video/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setPrediction({
                vehiclesGoingDown: response.data.vehicles_moving_down,
                vehiclesGoingUp: response.data.vehicles_moving_up,
                totalVehicles: response.data.total_vehicles,
            });
        } catch (error) {
            setErrors('An error occurred while processing the video.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get("http://localhost:8000/download_video/", {
                responseType: "blob",  // Important for handling binary files
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "output.avi"); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };
    

    return (
        <div className="min-h-screen w-screen bg-slate-900 flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Traffic<span className="text-blue-400">IQ</span>
                    <span className="text-blue-400">.</span>
                </h1>
                <p className="text-slate-400">Upload a video for prediction</p>
            </div>

            <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8">
                {errors && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center text-red-500">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>{errors}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="video">
                            Select Video
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <File className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="file"
                                accept="video/*"
                                id="video"
                                onChange={handleFileChange}
                                className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 flex justify-center rounded-lg text-white text-sm font-semibold transition-colors duration-200
                                ${loading
                                    ? 'bg-blue-500/50 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {loading ? 'Processing...' : 'Process Video'}
                        </button>
                    </div>
                </form>

                {prediction && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">Prediction Results</h3>
                        <p className="text-slate-200">Vehicles Going Down: {prediction.vehiclesGoingDown}</p>
                        <p className="text-slate-200">Vehicles Going Up: {prediction.vehiclesGoingUp}</p>
                        <p className="text-slate-200">Total Vehicles: {prediction.totalVehicles}</p>
                    </div>
                )}

                    {prediction &&<div className="mt-6">
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">Download Processed Video</h3>
                    <button
                        onClick={handleDownload}
                        className="mt-2 w-full py-2 px-4 text-center text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm font-semibold"
                    >
                        Download Processed Video
                    </button>
                </div>} 
            </div>
        </div>
    );
};

export default PredictionForm;
