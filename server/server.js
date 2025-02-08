const express = require('express');
const Papa = require('papaparse');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies

// Helper function to read and parse CSV
function readAndParseCSV(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file from path ${filePath}:`, err);
            res.status(500).send(`Failed to read the file from path ${filePath}`);
            return;
        }
        Papa.parse(data, {
            header: true,
            complete: (results) => {
                res.json(results.data);
            },
            error: (error) => {
                console.error(`Error parsing CSV from path ${filePath}:`, error);
                res.status(500).send(`Failed to parse the CSV file from path ${filePath}`);
            }
        });
    });
}

// Route for the first dataset
app.get('/csv/salary-edu', (req, res) => {
    const filePath = './datasets/salary-edu-range.csv';
    readAndParseCSV(filePath, res);
});

app.get('/csv/salary-exp', (req, res) => {
    const filePath = './datasets/salary-exp-range.csv';
    readAndParseCSV(filePath, res);
});

app.get('/csv/edu-exp', (req, res) => {
    const filePath = './datasets/edu-exp-range.csv';
    readAndParseCSV(filePath, res);
});

app.get('/csv/location-salary', (req, res) => {
    const filePath = './datasets/location-salary.csv';
    readAndParseCSV(filePath, res);
});

// China Map
app.get('/csv/province-data', (req, res) => {
    const filePath = './datasets/adjusted_province_data.csv';
    readAndParseCSV(filePath, res);
});

// Model Data for Overview
app.get('/csv/model-data', (req, res) => {
    const filePath = './datasets/model-data.csv';
    readAndParseCSV(filePath, res);
});

// Updated Helper function to read and parse CSV which now returns a Promise
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(`Error reading file from path ${filePath}: ${err}`);
            return;
        }
        Papa.parse(data, {
            header: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(`Error parsing CSV from path ${filePath}: ${error}`)
        });
    });
    });
}

//===================== Filter =====================

function calculateAverageSalary(data, categories, city) {
  const categoryData = categories.reduce((acc, category) => {
    acc[category] = { sum: 0, count: 0, quantity: 0 };
    return acc;
  }, {});

  data.forEach(item => {
    const category = item.category;
    if (categoryData[category] !== undefined) {
      const salary = parseFloat(item.average_salary);
      if (!isNaN(salary)) {
        categoryData[category].sum += salary;
        categoryData[category].count += 1;
      }
      categoryData[category].quantity += 1; 
    }
  });

  const averagesAndQuantities = categories.map(category => {
    const average_salary = categoryData[category].count > 0
      ? parseFloat((categoryData[category].sum / categoryData[category].count).toFixed(2))
      : 0;
    return {
      category,
      average_salary,
      quantity: categoryData[category].quantity,
    };
  });

  return averagesAndQuantities;
}


  
  function filterData(education, experience, city, categories, callback) {
    const filePath = './datasets/model-data.csv';
    
    readCSV(filePath).then(data => {
      const filteredData = data.filter(item => {
        const matchesEducation = education === 'Any' || item.education === education;
        const matchesExperience = experience === 'Any' || item.experience === experience;
        const matchesCity = city === 'Any' || item.city === city;
        return matchesEducation && matchesExperience && matchesCity;
      });
      const averages = calculateAverageSalary(filteredData, categories);
      callback(null, averages);
    }).catch(error => {
      console.error("Error reading or parsing CSV:", error);
      callback(error);
    });
  }
  
  
  const categories = ['AI & Analytics', 'Backend Development', 'Frontend Development', 'Others', 'System Admin'];

  // Route for filtered-salary
  app.get('/csv/filtered-salary', (req, res) => {
    const { education, experience,city } = req.query;
  
    filterData(education, experience,city, categories, (error, averages) => {
      if (error) {
        res.status(500).send("An error occurred while filtering the data.");
      } else {
        res.json(averages);
      }
    });
  });
  
  

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});