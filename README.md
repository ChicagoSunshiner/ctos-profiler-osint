# 📱 ctOS Profiler - OSINT Intelligence Tool

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

Projekt nowoczesnej aplikacji internetowej typu **OSINT (Open Source Intelligence)** zainspirowanej interfejsem "Profiler" z gry **Watch Dogs**. Narzędzie pozwala na szybkie skanowanie śladu cyfrowego użytkownika i archiwizację wyników.

## 🛠️ Technologia
Aplikacja została zbudowana zgodnie z wymaganiami zadania:
- **Backend:** Python + Django REST Framework (zarządzanie skanerem, API).
- **Frontend:** React.js (animacje Framer Motion, ikony Lucide-React).
- **Baza Danych:** SQLite (automatyczna archiwizacja zapytań).
- **Stylistyka:** Custom CSS inspirowany grą Watch Dogs.

## ✨ Kluczowe Funkcjonalności
- **Global Scanner:** Przeszukiwanie węzłów Instagram, Facebook, GitHub, Reddit, Steam oraz Linktree.
- **Data Logging:** Każde wyszukiwanie jest automatycznie zapisywane w bazie danych (Model `ScanLog`).
- **Admin Central:** Pełny wgląd w historię skanowania poprzez panel administracyjny Django.
- **Hacker HUD:** Dynamiczny interfejs reagujący na "poziom zagrożenia" (Threat Level) celu.

## 🚀 Jak uruchomić projekt?

### 1. Backend (Django)
```bash
# Aktywacja środowiska
venv\Scripts\activate

# Instalacja i migracja bazy danych
pip install django djangorestframework django-cors-headers requests
python manage.py makemigrations
python manage.py migrate

# Uruchomienie serwera
python manage.py runserver
```
### 2. Panel Administratora
Dostęp do bazy danych z poziomu przeglądarki:
URL: http://127.0.0.1:8000/admin/

Wymagane stworzenie konta przez python manage.py createsuperuser

### 3. Frontend (React)
```bash
cd frontend
npm install
npm start
```

### Projekt przygotowany jako zadanie zaliczeniowe z technologii Django & React.
