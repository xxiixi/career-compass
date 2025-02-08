import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import SalaryPredictionForm from "@/scenes/dashboard/SalaryPrediction"; 

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predict" element={<SalaryPredictionForm apiEndpoint="http://127.0.0.1:5001/predict" />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

