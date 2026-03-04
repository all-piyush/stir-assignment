## Movie AI App (Full-Stack MERN)
- A full-stack web application built with Next.js and Node.js.This project demonstrates a decoupled architecture with a modern React frontend and a robust Express REST API, deployed seamlessly across serverless and cloud providers.  
- By simply entering an IMDb movie ID, users can instantly retrieve comprehensive movie metadata alongside dynamically generated AI insights  


## Key Features
- **IMDb ID Integration:** Users can input any valid IMDb ID to seamlessly fetch and display deep movie details (including plot summaries, cast, ratings, and release data).
- **AI-Powered Insights:** Enhances the traditional movie-browsing experience by generating and displaying custom AI data for each film (e.g., audience sentimnts summary, overall sentiments).
- **Secure Proxy Architecture:** Utilizes Next.js asynchronous rewrites to securely bridge the HTTPS frontend with the AWS EC2 HTTP backend, entirely eliminating CORS and Mixed Content errors.

## Tech Stack
- **Frontend:** Next.js, React, JavaScript
- **Backend:** Node.js, Express.js
- **AI Integration:** Gemini Ai
- **Deployment:** Vercel (Frontend), AWS Elastic Beanstalk (Backend)

## Project Structure
- movie-ai-app-backend/
- movie-ai-app-frontend/

## Environment Variables
- Frontend requires:
  - NEXT_PUBLIC_BACKEND_URL

- Backend requires:
  - GEMINI_API_KEY
  - OMDB_API_KEY
  - TMDB_API_KEY


