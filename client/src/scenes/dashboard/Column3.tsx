import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, PieChart, Tooltip, Sector, ResponsiveContainer,Cell, Pie } from "recharts";
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import SalaryPredictionForm from './SalaryPrediction';

const Row3 = () => {
    const [education, setEducation] = useState('Any');
    const [experience, setExperience] = useState('Any');
    const [city, setCity] = useState('Any');
    const [returnedData, setReturnedData] = useState<ReturnedData[]>([]);

    const educations = ['Any', 'Associate', 'Bachelor', 'Master', 'Doctor'];
    const experiences = ['Any', '1-3', '3-5', '5-10','unlimited'];
    const cities = ['Any', 'Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

    const pieColors = ['#D0BBFF', '#B79EFF', '#A66CFF', '#7E43AA','#5E2A7E'];


    // Pie Chart Customization
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    const renderActiveShape = (props, totalQuantity) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx-280} y={cy-130} dy={8} textAnchor="left" fill="white" style={{ fontSize: '16px',fontWeight: 'bold' }}>
                    {payload.category}
                </text>

                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">
                    {`${value} / Total ${totalQuantity}`}
                </text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#fff">
                    {`Rate ${(percent * 100).toFixed(2)}%`}
                </text>
            </g>
        );
    };

    const totalQuantity = returnedData.reduce((acc, cur) => acc + cur.quantity, 0);

    interface ReturnedData {
        category: string;
        average_salary: number;
        quantity: number;
    }

    useEffect(() => {
        fetch('http://localhost:3000/csv/filtered-salary?education=' + encodeURIComponent(education) + '&experience=' + encodeURIComponent(experience) + '&city=' + encodeURIComponent(city))
          .then(response => response.json())
          .then((data: ReturnedData[]) => { // Explicitly setting the type of data here
            setReturnedData(data.map((item: ReturnedData) => ({ // Also explicitly setting the type of item here
              category: item.category,
              average_salary: item.average_salary,
              quantity: item.quantity
            })));
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, [education, experience, city]); // Dependencies array

      function KFormatter(value: number | string): string {
        return `${value} K`;  // Append 'K' to the number or string
      }
      
      

    return (
        <>
        <DashboardBox style={{ height: '150px' }} gridArea="c">
            <BoxHeader
                title="Customized average salary comparison"
                subtitle="Select your Education level, working experience, and city to compare the average salary."
                sideText="Comparison Filter"
            />

            {/* Flex container for form controls */}
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 10px' }}>
                <FormControl style={{ flex: 1, margin: '0 4px' }}>
                    <InputLabel style={{ color: '#fff' }} id="education-select-label">Education Level</InputLabel>
                    <Select
                        labelId="education-select-label"
                        id="education-select"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        style={{ color: '#fff', backgroundColor: '#555', borderRadius: '8px' }}
                    >
                        {educations.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl style={{ flex: 1, margin: '0 8px' }}>
                    <InputLabel style={{ color: '#fff' }} id="experience-select-label">Experience Years</InputLabel>
                    <Select
                        labelId="experience-select-label"
                        id="experience-select"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        style={{ color: '#fff', backgroundColor: '#555', borderRadius: '8px' }}
                    >
                        {experiences.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl style={{ flex: 1, margin: '0 8px' }}>
                    <InputLabel style={{ color: '#fff' }} id="city-select-label">City</InputLabel>
                    <Select
                        labelId="city-select-label"
                        id="city-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ color: '#fff', backgroundColor: '#555', borderRadius: '8px' }}
                    >
                        {cities.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </DashboardBox>
            
        <DashboardBox style={{ height: '310px', marginTop: '-80px' }} gridArea="i">
            <BoxHeader
                title="Average Salary Comparison"
                subtitle="Comparison of Average Salary based on Education, Experience, and City."
                sideText="Job Category & Average Salary"
            />

            <ResponsiveContainer width="85%" height={240}>
            <BarChart 
                data={returnedData}
                margin={{ top: 20, right: 0, left: 70, bottom: 0 }}
                layout="vertical"
                >
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#de4ae3" />
                    <stop offset="30%" stopColor="#9967e9" />
                    <stop offset="100%" stopColor="#13e4fe" />
                    </linearGradient>
                </defs>
                <XAxis 
                    type="number" 
                    style={{ fontSize: "12px", fill: '#fff' }}
                    domain={[0, 'dataMax']}
                    tickFormatter={KFormatter}  // Use the KFormatter for the X-axis labels
                /> 
                <YAxis 
                    dataKey="category" 
                    type="category" 
                    style={{ fontSize: "12px", fill: '#fff' }}
                /> 
                <Tooltip 
                    formatter={(value) => KFormatter(value)}  // Use the KFormatter for tooltip values
                />
                <Bar dataKey="average_salary" fill="url(#colorGradient)" barSize={20} />
                </BarChart>
            </ResponsiveContainer>

        </DashboardBox>

        <DashboardBox  gridArea="f">
            <BoxHeader
                title="Job Category Distribution"
                subtitle="Pie Chart showing the distribution of job categories"
                sideText="Job Category & Quantity"
            />

            <ResponsiveContainer width="100%" height='100%'>
                <PieChart>
                    <Pie
                        data={returnedData}
                        dataKey="quantity"
                        nameKey="category"
                        cx="50%" //
                        cy="40%"
                        innerRadius={40}
                        outerRadius={80}
                        onMouseEnter={onPieEnter}
                        activeIndex={activeIndex}
                        activeShape={(props) => renderActiveShape(props, totalQuantity)} // Passing totalQuantity here
                    >
                        {returnedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

        </DashboardBox>

        <DashboardBox gridArea="h">
            <BoxHeader
                title="Job Salary Prediction"
                subtitle="Predict your salary based on job title, region, education, and experience"
                sideText="Prediction Model"
            />
            <ResponsiveContainer width="100%" height="100%">
                <SalaryPredictionForm apiEndpoint="http://127.0.0.1:5001/predict" />
            </ResponsiveContainer>
        </DashboardBox>
        </>
    );
};

export default Row3;
