import React, { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
    const [video, setVideo] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null); // State for processed video URL

    // Handle file change when the user selects a video file
    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video) {
            alert("Please select a video file.");
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

            if (response.data.video_url) {
                setVideoUrl(`http://localhost:8000${response.data.video_url}`);
            }
        } catch (error) {
            console.error("Error while processing the video:", error);
            alert("An error occurred while processing the video.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Process Video"}
                </button>
            </form>

            {prediction && (
                <div>
                    <h3>Prediction Results:</h3>
                    <p>Vehicles Going Down: {prediction.vehiclesGoingDown}</p>
                    <p>Vehicles Going Up: {prediction.vehiclesGoingUp}</p>
                    <p>Total Vehicles: {prediction.totalVehicles}</p>
                </div>
            )}

            {videoUrl && (
                <div>
                    <h3>Processed Video:</h3>
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                        Download Processed Video
                    </a>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;
