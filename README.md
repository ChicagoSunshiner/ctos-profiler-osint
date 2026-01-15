# 📱 ctOS Profiler - Advanced OSINT Intelligence Tool

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)

An advanced **Open Source Intelligence (OSINT)** web and mobile application inspired by the "Profiler" HUD from the **Watch Dogs** franchise. This tool allows users to scan digital footprints across multiple social platforms in real-time.

## 🛠️ Tech Stack
This project follows **Clean Code** principles and a **Decoupled Architecture**:
- **Backend:** Python 3.x & Django REST Framework (Scalable API).
- **Frontend:** React.js (Component-based UI with Framer Motion animations).
- **Mobile:** Capacitor (Cross-platform native Android integration).
- **Database:** SQLite (Persistent logging of all scan activities).
- **Deployment:** Render.com (Cloud-based Backend Node).

## ✨ Key Features
- **Global Data Nodes:** Scans GitHub, Reddit, Facebook, Instagram, Steam, and Linktree.
- **Deep Interception:** Extracts public emails and geolocation data via GitHub API.
- **AI Personality Profiling:** Algorithmic subject analysis based on social presence and bio metadata.
- **Smart Filtering:** Content-analysis engine to eliminate "False Positive" results.
- **Central Data Log:** Automatic database logging of every identified subject (Viewable via Django Admin).

## 🚀 Installation & Setup

### 1. Backend Node (Django)
```bash
# Activate environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Database migrations
python manage.py makemigrations
python manage.py migrate

# Start local server
python manage.py runserver
```

### 2. Frontend Interface (React)
```bash
cd frontend

# Install dependencies
npm install

# Run in development mode (Linked to localhost)
npm start
```
### 3. Mobile Deployment (Android)
```bash
cd frontend

# Build web assets
npm run build

# Sync with Android Studio
npx @capacitor/cli copy android

# Open in Android Studio to build APK
npx @capacitor/cli open android
```

### 📁 Project Structure
/api - Core OSINT scanner logic, models, and REST endpoints.

/core - Main system configuration and security settings.

/frontend - React application source code and mobile assets.

## 💻 Local Presentation Mode (For Evaluators)

The application features a **Smart Environment Switcher**. It automatically detects if it is running on a local machine or in the cloud, adjusting the API connection accordingly.

To run the full stack locally for presentation or testing purposes:

### 1. Start the Backend Node
Open a terminal in the root directory:
```bash
# Activate environment
venv\Scripts\activate

# Apply local database migrations
python manage.py migrate

# Start the Django server (Port 8000)
python manage.py runserver
```
### 2. Start the Frontend Interface
Open a second terminal in the frontend directory:
```bash
cd frontend
npm start
```
The app will open at http://localhost:3000 and automatically link to your local Django server.

### 3. Accessing the Data Log (Admin)
To view the intercepted data history locally:
1. Go to http://127.0.0.1:8000/admin/
2. Log in with your superuser (don't forget them like I did!) credentials
3. Explore the Subject Scan Logs section to see the persistent database records
