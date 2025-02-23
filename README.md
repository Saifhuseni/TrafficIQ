# **TrafficIQ: AI-Powered Intelligent Traffic Monitoring System with Future Congestion Control Capabilities** 
---
![Logo]([https://github.com/yourusername/yourrepo/blob/main/images/yourimage.png?raw=true](https://github.com/Saifhuseni/TrafficIQ/blob/main/AppPics/logo.jpg))

## 🚀 **Overview**  
Traffic congestion and road safety continue to pose significant urban challenges, leading to increased travel times, fuel consumption, and accidents. Conventional traffic monitoring systems rely on static signals and lack real-time adaptability, making them inefficient in responding to fluctuating road conditions.

Our **AI-powered intelligent traffic monitoring system** harnesses the power of computer vision and deep learning to track vehicle speeds, count total vehicles, and analyze lane-wise movement in real time. Additionally, by integrating external data sources, the system predicts congestion levels, offering valuable insights to improve traffic flow and urban mobility.

In the future, this system can be further enhanced to dynamically optimize traffic signals based on real-time road conditions, paving the way for a smarter, safer, and more efficient traffic management solution.

---
## 🛠 Features

- ✅ **Real-time Vehicle Speed Tracking** – Detects and records vehicle speeds using AI-powered analysis.
- ✅ **Total Vehicle Count** – Accurately counts the number of vehicles passing through a monitored area.
- ✅ **Lane-wise Traffic Analysis** – Tracks vehicle movement across different lanes to understand traffic flow.

- ✅ **AI-driven Congestion Prediction** – Successfully implemented congestion prediction using external APIs for real-time insights.

## 🔮 Future Enhancements 

- ✅ **Smart Traffic Signal Optimization** – Dynamically adjusts traffic signal timers based on vehicle density to reduce bottlenecks.
- ✅ **Advanced Traffic Pattern Recognition** – Enhancing AI models to detect traffic anomalies and improve road safety.

---

## ⚙️ **Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Frontend:** React.js  
- **AI & Computer Vision:** OpenCV, YOLO  Model  
- **Database:** MongoDB   
- **Additional Tools:** Python, Pandas, NumPy  

---

## 📂 **Project Structure**  
```
TrafficIQ/
├── ex1.mp4
├── ex2.mp4
├── ex2mini.mp4
├── highway_mini.mp4
├── highway.mp4
├── output.avi
├── README.md
├── speed_estimate.ipynb
├── tracker.py
├── tracking_data.pkl
├── TrafficIQ.ipynb
├── yolov8s.pt
├── backend/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   ├── default.json
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── fastapi/
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   ├── model.pkl
│   │   └── tracker.py
│   ├── logs/
│   │   └── error.log
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── output/
│   ├── routes/
│   │   └── authRoutes.js
│   ├── scripts/
│   ├── uploads/
│   └── utils/
│       └── logger.js
├── detected_frames/
│   ├── frame_1.jpg
│   ├── frame_2.jpg
│   ├── frame_3.jpg
│   ├── frame_4.jpg
│   ├── ...
│   └── frame_226.jpg
└── frontend/
    ├── .gitignore
    ├── .env
    ├── tailwind.config.js
    ├── src/
    │   ├── pages/
    │   │   ├── UploadPage.js
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── HomePage.js
    │   │   ├── TrafficCongestion.js
    │   │   ├── Dashboard.js
    │   │   └── ...
    │   ├── components/
    │   │   ├── Upload.js
    │   │   ├── Layout/
    │   │   │   └── Navbar.js
    │   │   ├── PredictionForm.js
    │   │   └── ...
    │   ├── services/
    │   │   └── authService.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── index.css
    │   ├── index.js
    │   └── App.js

```

---

## 📌 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Saifhuseni/TrafficIQ
cd TrafficIQ
```

### **2️⃣ Install Dependencies**  
For the **backend**:  
```sh
cd backend
npm install
```
For the **frontend**:  
```sh
cd frontend
npm install
```

### **3️⃣ Run the Project**  
Start the **backend server**:  
```sh
cd backend
node server.js
```
Start the **frontend**:  
```sh
cd frontend
npm start
```
Start the **Fastapi**:  
```sh
cd backend/fastapi
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```


---

## 🎯 **Usage**  
1. Upload a **video feed** or integrate a **live traffic camera**.  
2. The AI model will process the video and analyze vehicle movement.  
3. View real-time traffic data, including **vehicle count, speeds, and lane-wise movement**.  
4. Download the processed video. 
5. Traffic Congestion Monitoring:
Manually enter coordinates or select a location from the map to check congestion levels.
7. Insights can be used for **better traffic management and future congestion control**.

---



##  **Developed By**  
- **Saif Huseni**  
 

---

  
