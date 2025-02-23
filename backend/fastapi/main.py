from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import uvicorn
import os
import cv2
import numpy as np
import pandas as pd
from ultralytics import YOLO
from tracker import Tracker
import time

app = FastAPI()

# Load YOLO model
model = YOLO('yolov8s.pt')

# Define class list for YOLO (same as in your model)
class_list = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 
              'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 
              'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 
              'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 
              'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 
              'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 
              'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 
              'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 
              'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush']

# Directory for saving uploads and outputs
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Allow CORS for all origins (for testing)
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI Video Processing API"}

@app.post("/process_video/")
async def process_video(file: UploadFile = File(...)):
    # Save the uploaded file locally
    video_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(video_path, "wb") as f:
        f.write(await file.read())
    
    # Prepare to read the video and write the output video
    cap = cv2.VideoCapture(video_path)
    width, height = 1020, 500  # Set frame size as desired
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    output_filename = "output.avi"
    output_video_path = os.path.join(UPLOAD_DIR, output_filename)
    out = cv2.VideoWriter(output_video_path, fourcc, 20.0, (width, height))
    
    # Initialize tracker and tracking variables (as in your model)
    tracker = Tracker()
    down = {}
    up = {}
    counter_down = []
    counter_up = []
    
    # Define line positions and parameters
    red_line_y = 198
    blue_line_y = 268
    offset = 6
    real_distance_meters = 50  # Adjust as necessary
    
    # (Optional) Create folder for saving intermediate frames
    if not os.path.exists('detected_frames'):
        os.makedirs('detected_frames')
    
    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        count += 1
        frame = cv2.resize(frame, (width, height))
        
        # Run YOLO prediction
        results = model.predict(frame)
        a = results[0].boxes.data
        a = a.detach().cpu().numpy()
        df = pd.DataFrame(a).astype("float")
        objects = []
        for index, row in df.iterrows():
            x1 = int(row[0])
            y1 = int(row[1])
            x2 = int(row[2])
            y2 = int(row[3])
            d = int(row[5])
            c = class_list[d]
            # Track vehicles similar to your model
            if 'car' in c or 'truck' in c or 'motorcycle' in c or 'bus' in c:
                objects.append([x1, y1, x2, y2])
        
        bbox_ids = tracker.update(objects)
        
        # Optionally, draw the static lines
        cv2.line(frame, (172, red_line_y), (774, red_line_y), (0,0,255), 2)
        cv2.line(frame, (8, blue_line_y), (927, blue_line_y), (255,0,0), 2)
        
        for bbox in bbox_ids:
            x3, y3, x4, y4, obj_id = bbox
            cx = (x3 + x4) // 2
            cy = (y3 + y4) // 2

            # Draw bounding box and id (optional)
            cv2.rectangle(frame, (x3, y3), (x4, y4), (0, 255, 0), 2)
            #cv2.putText(frame, str(obj_id), (x3, y3 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)

            # Check vehicle crossing the red line (going down)
            if red_line_y - offset < cy < red_line_y + offset:
                down[obj_id] = time.time()
            if obj_id in down and blue_line_y - offset < cy < blue_line_y + offset:
                elapsed_time = time.time() - down[obj_id]
                if obj_id not in counter_down:
                    counter_down.append(obj_id)
                    # Calculate speed
                    pixel_distance = abs(blue_line_y - red_line_y)
                    scale_factor = real_distance_meters / pixel_distance  # meters per pixel
                    real_distance_travelled = pixel_distance * scale_factor
                    speed_ms = real_distance_travelled / elapsed_time  # m/s
                    speed_kmh = speed_ms * 3.6  # Convert to km/h
                    
                    cv2.putText(frame, f"{int(speed_kmh)} km/h", (x4, y4), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)

            # Check vehicle crossing the blue line (going up)
            if blue_line_y - offset < cy < blue_line_y + offset:
                up[obj_id] = time.time()
            if obj_id in up and red_line_y - offset < cy < red_line_y + offset:
                elapsed_time = time.time() - up[obj_id]
                if obj_id not in counter_up:
                    counter_up.append(obj_id)
                    # Calculate speed
                    pixel_distance = abs(red_line_y - blue_line_y)
                    scale_factor = real_distance_meters / pixel_distance  # meters per pixel
                    real_distance_travelled = pixel_distance * scale_factor
                    speed_ms = real_distance_travelled / elapsed_time  # m/s
                    speed_kmh = speed_ms * 3.6  # Convert to km/h
                    
                    cv2.putText(frame, f"{int(speed_kmh)} km/h", (x4, y4), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
        
        # Optionally, annotate the frame with counts
        cv2.putText(frame, f"Down: {len(counter_down)}", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,0), 2)
        cv2.putText(frame, f"Up: {len(counter_up)}", (10,60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,0), 2)
        cv2.putText(frame, f"Total: {len(counter_down)+len(counter_up)}", (10,90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,0), 2)
        
        # Write the frame to the output video file
        out.write(frame)
    
    cap.release()
    out.release()
    
    return {
        "vehicles_moving_down": len(counter_down),
        "vehicles_moving_up": len(counter_up),
        "total_vehicles": len(counter_down) + len(counter_up),
        "output_video_url": f"http://localhost:8000/download/{output_filename}"
    }
@app.get("/download_video/")
async def download_video():
    file_path = "uploads/output.avi"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="video/x-msvideo", filename="output.avi")
    return {"error": "File not found"}