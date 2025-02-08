import React, { useState } from 'react';
import { Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography, TextField } from '@mui/material';

interface SalaryPredictionFormProps {
  apiEndpoint: string;
}

interface FormData {
  [key: string]: string;
  education: string;
  experience: string;
  companySize: string;
  category: string;
  city: string;
}

interface Option {
  value: string;
  label: string;
}

function SalaryPredictionForm({ apiEndpoint }: SalaryPredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    education: '',
    experience: '',
    companySize: '',
    category: '',
    city: ''
  });
  const [predictedSalary, setPredictedSalary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof formData;
    const value = event.target.value as string;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = () => {
    setIsLoading(true);
    setError('');
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      if (!text) {
        throw new Error('Response body is empty');
      }
      const data = JSON.parse(text);
      setPredictedSalary(`Predicted Salary: ${data.salary}`);
      setIsLoading(false);
    })
    .catch(error => {
      setError(`Failed to fetch data: ${error.message}`);
      setPredictedSalary('');
      setIsLoading(false);
    });
  };
  

  interface Option {
    value: string;
    label: string;
  }
  
  interface SelectOptions {
    [key: string]: Option[];
  }
  

  const selectOptions = {
    education: [
      { value: "0", label: "Associate" },
      { value: "1", label: "Bachelor" },
      { value: "3", label: "Master" },
      { value: "2", label: "PhD" },
      { value: "4", label: "Unlimited" }
    ],
    experience: [
      { value: "0", label: "1-3 years" },
      { value: "1", label: "3-5 years" },
      { value: "2", label: "5-10 years" },
      { value: "3", label: "Over 10 years" },
      { value: "4", label: "Unlimited" }
    ],
    companySize: [
      { value: "0", label: "0-20" },
      { value: "3", label: "20-99" },
      { value: "1", label: "100-499" },
      { value: "4", label: "500-999" },
      { value: "2", label: "1000-9999" },
      { value: "5", label: "Over 10000+" }
    ],
    category: [
      { value: "0", label: "AI & Analytics" },
      { value: "1", label: "Backend Development" },
      { value: "2", label: "Frontend Development" },
      { value: "3", label: "Others" },
      { value: "4", label: "System Admin" }
    ],
    city: [
      { value: "0", label: "Beijing" },
      { value: "1", label: "Guangzhou" },
      { value: "2", label: "Shanghai" },
      { value: "3", label: "Shenzhen" }
    ]
  };
  
  return (
    <div style={{ padding: '10px', borderRadius: '8px'}}>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {['education', 'experience'].map(field => (
            <FormControl fullWidth margin="dense" key={field} variant="outlined" style={{ flex: 1, margin: '0 8px' }}>
              <InputLabel style={{ color: '#fff' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
              <Select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{ color: '#fff', backgroundColor: '#555' }}
              >
                {selectOptions[field].map((option: Option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {['companySize', 'category', 'city'].map(field => (
            <FormControl fullWidth margin="dense" key={field} variant="outlined" style={{ flex: 1, margin: '0 8px' }}>
              <InputLabel style={{ color: '#fff' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
              <Select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{ color: '#fff', backgroundColor: '#555' }}
              >
                {selectOptions[field].map((option: Option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '50px', marginBottom: '20px', marginLeft: '10px' }}>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <Button
                variant="contained"
                onClick={submitForm}
                style={{
                  height: '50px',
                  width: '200px',
                  background: 'linear-gradient(45deg, #13e4fe, #9967e9, #de4ae3)',
                  color: '#fff',
                  fontSize: '14px',
                  borderRadius: '10px'
                }}
              >
                Predict Salary
              </Button>

              <TextField
                style={{ marginLeft: '40px', width: '200px', height: '50px', color: '#fda736', fontWeight: 'bold' }}
                label={error ? "Error" : "Predicted Salary"}
                value={error ? error : (predictedSalary ? `${predictedSalary} K` : '')} 
                margin="normal"
                helperText={error ? "Please try again" : "Your estimated salary"}
                error={!!error}
                InputLabelProps={{
                  style: { color: error ? '#f44336' : '#fff' },
                }}
                inputProps={{ style: { color: error ? '#f44336' : '#fda736', backgroundColor: '#555', borderRadius: '10px', fontWeight: 'bold' } }}
                variant="outlined"
                disabled={!error && !predictedSalary}
              />
            </>
          )}
        </div>


        </>
      )}
    </div>
  );
};
export default SalaryPredictionForm;
