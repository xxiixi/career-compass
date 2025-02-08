# Readme

[toc]

## Description

This project is part of the CSE6242 course at Georgia Tech and involves developing a full-stack data visualization app using React, Node.js, and Python. The app visualizes job market trends and provides predictive analyses of job salaries using various machine learning models.

- The frontend is built with React using Vite for rapid development and Material UI for UI components. Visualization libraries like Recharts and Echarts are utilized to display interactive data graphs.

- The backend is powered by Node.js with Express.js for efficient data handling and routing.
- The predictive model runs on Python, employing techniques like linear regression, neural networks, SVR, and XGBoost to forecast job salaries.

## Installation

### Prerequisites

- Node.js 17.9.1
- React 18.2.0
- Python 3.9 or higher
- VITE 4.5.3
- Git

### Clone the Repository

`git clone https://github.gatech.edu/CSE6242SPR24/CSE6242_Spr24_T2_Job.git`

`cd CSE6242_Spr24_T2_Job/Code/react-data-visual-analytics`

## EXECUTlON

### Server

`cd server`

`npm install`

`npm start` or `node server.js`

Running successfully on port 3000:
`Server is running on http://localhost:3000`

### Model

The package XGBoost requires the python version 3.9 or higher, such that you should ensure your python version is suitable to run our model successfully.

`cd model`

`python app.py`

(use `pip install` to install packages if necessary)

Running successfully on port 5001:
` Running on http://127.0.0.1:5001`

### Client

`cd client`

`npm install`

`npm run dev`

Running successfully on port 5173:

` Local: http://127.0.0.1:5173/`

## Additional Information

### Technology Stack

- **Vite**: Enhances the development experience with fast rebuilds.
- **Material UI**: Provides a robust set of React components.
- **Recharts & Echarts**: Used for rendering complex and responsive charts.
- **Node.js & Express.js**: Facilitate efficient server-side logic and API routing.
- **Python**: Handles the machine learning model operations.

### Directory Structure

- **client/**: Contains the React application's source code and frontend logic.
- **server/**: Manages backend operations, including data processing and API endpoints.
- **model/**: Includes the Python machine learning models for salary prediction.

### Usage Tips

1. Start the server and model before initiating the client to ensure all backend services are available.

2. For detailed chart interactions, make sure client-side dependencies are correctly installed, especially the specific versions required for map visualizations.

   > When downloading the map of China, you cannot directly use npm to download the latest version of echarts (version 5.x). Instead, you need to download "echarts": "4.5", otherwise the "react-echarts-map-china": "^0.1.9" package will not be found.

## Contact

If you encounter any issues or have queries, please reach out via email at xwang3234@gatech.edu or file an issue in the GitHub repository.
