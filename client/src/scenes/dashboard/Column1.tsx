import React, { useState, useEffect } from 'react';
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
  ResponsiveContainer,
  AreaChart,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  BarChart,
  Bar,
  Area,
} from "recharts";

// Define the expected shape of the CSV data
type SalaryEduData = {
  Range: string;
  Associate_average: number;
  Bachelor_average: number;
  Master_average: number;
  Doctoral_average: number;
};

type SalaryExpData = {
  range: string;
  exp1_3: number;
  exp3_5: number;
  exp5_10: number;
  over10: number;
  unlimited: number;
};

type EduExpData = {
  Experience: string;
  Associate: number;
  Bachelor: number;
  Master: number;
  Doctoral: number;
};

type LegendLabelsType = {
  [key: string]: string;
};

// Now define the legendLabels with the correct type
const legendLabels: LegendLabelsType = {
  exp1_3: "1-3 years",
  exp3_5: "3-5 years",
  exp5_10: "5-10 years",
  over10: "Over 10 years",
  unlimited: "Unlimited",
};

const Row1: React.FC = () => {
  const [salaryEduData, setSalaryEduData] = useState<SalaryEduData[]>([]);
  const [salaryExpData, setSalaryExpData] = useState<SalaryExpData[]>([]);
  const [eduExpData, setEduExpData] = useState<EduExpData[]>([]);

  // Fetch salary-edu data
  useEffect(() => {
    fetch('http://localhost:3000/csv/salary-edu')
      .then(response => response.json())
      .then(data => setSalaryEduData(data))
      .catch(error => console.error("Error fetching salary-edu data:", error));
  }, []);

  // Fetch salary-exp data
  useEffect(() => {
    fetch('http://localhost:3000/csv/salary-exp')
      .then(response => response.json())
      .then(data => setSalaryExpData(data))
      .catch(error => console.error("Error fetching salary-exp data:", error));
  }, []);

  // Fetch edu-exp data
  useEffect(() => {
    fetch('http://localhost:3000/csv/edu-exp')
      .then(response => response.json())
      .then(data => setEduExpData(data))
      .catch(error => console.error("Error fetching edu-exp data:", error));
  }, []);


  // Process data for the charts
  const salaryEdu = salaryEduData.map(({ Range, Associate_average, Bachelor_average,Master_average,Doctoral_average }) => ({
    name: Range,
    Associate: Associate_average,
    Bachelor: Bachelor_average,
    Master: Master_average,
    Doctoral: Doctoral_average
  }));

  // Inside the component where charts are defined
  const salaryExp = salaryExpData.map(({range,exp1_3,exp3_5,exp5_10,over10,unlimited}) => ({
    name: range,
    exp1_3: exp1_3,
    exp3_5: exp3_5,
    exp5_10: exp5_10,
    over10: over10,
    unlimited: unlimited
  }));

  const eduExp = eduExpData.map(({Experience,Associate,Bachelor,Master,Doctoral}) => ({
    name: Experience,
    Associate: Associate,
    Bachelor: Bachelor,
    Master: Master,
    Doctoral: Doctoral
  }));

  return (
    <>
      {/* Revenue and Expenses Area Chart */}
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Shenzhen: Salary Education Analysis"
          subtitle="Area Chart showing salary range by education level"
          sideText="Education-Salary"
        />
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={salaryEdu}
          margin={{
            top: 10,
            right: 30,
            left: -15,
            bottom: 60,
          }}>
        <defs>
          <linearGradient id="colorAssociate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#13e4fe" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#13e4fe" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorBachelor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#de4ae3" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#de4ae3" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorMaster" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fda736" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#fda736" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDoctoral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff2e54" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ff2e54" stopOpacity={0}/>
          </linearGradient>
        </defs>
          <XAxis 
            dataKey="name" 
            tickLine={false} 
            style={{ fontSize: "12px" ,fill: '#fff'  }} 
          />
          <YAxis 
            tickLine={false} 
            style={{ fontSize: "12px"  ,fill: '#fff'  }} 
            ticks={[0, 20, 40, 60, 80, 170]}
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${value}`}
            allowDataOverflow
          />
          <Tooltip />
          <Legend verticalAlign="bottom" wrapperStyle={{ bottom: 60, left: 20 }} />
          <Area type="monotone" dataKey="Associate" stroke="#13e4fe" fill="url(#colorAssociate)" />
          <Area type="monotone" dataKey="Bachelor" stroke="#de4ae3" fill="url(#colorBachelor)" />
          <Area type="monotone" dataKey="Master" stroke="#fda736" fill="url(#colorMaster)" />
          <Area type="monotone" dataKey="Doctoral" stroke="#ff2e54" fill="url(#colorDoctoral)" />

        </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="d">
      <BoxHeader
        title="Shenzhen: Salary Experience Analysis"
        subtitle="Line chart showing experience vs salary range"
        sideText="Experience-Salary"
      />
      <ResponsiveContainer width="100%" height="100%">
        
        <LineChart
          data={salaryExp}
          margin={{
            top: 10,
            right: 35,
            left: -25,
            bottom: 60,
          }}
        >
          <XAxis 
            tickLine={false}
            style={{ fontSize: "12px"  ,fill: '#fff' }} 
            dataKey="name" />
          <YAxis 
            tickLine={false} 
            style={{ fontSize: "12px"  ,fill: '#fff' }} 
            ticks={[0, 20, 40, 60, 80, 169]}
            domain={['auto', 'auto']}/>
          <Tooltip />
          <Legend
            formatter={(value) => legendLabels[value] || value}  
            wrapperStyle={{ bottom: 60, left: 15 }} 
            verticalAlign="bottom" />
          <Line type="monotone" dataKey="exp1_3" stroke="#13e4fe" strokeWidth={1.5} />
          <Line type="monotone" dataKey="exp3_5" stroke="#D0BBFF" strokeWidth={1.5} />
          <Line type="monotone" dataKey="exp5_10" stroke="#A66CFF" strokeWidth={1.5} />
          <Line type="monotone" dataKey="over10" stroke="#de4ae3" strokeWidth={1.5} />
          <Line type="monotone" dataKey="unlimited" stroke="#7E43AA" strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>


      {/* Revenue Month by Month Bar Chart */}
      <DashboardBox gridArea="g">
      <BoxHeader
        title="Shenzhen: Educational Experience Analysis"
        subtitle='Bar chart showing experience vs education level'
        sideText='Education-Experience'
      />
        <ResponsiveContainer width="100%" height="95%">
        <BarChart 
          data={eduExp} 
          margin={{ 
            top: 15, 
            right: 30, 
            left: -10, 
            bottom: 50 
          }}>
          <XAxis 
            tickLine={false}
            dataKey="name" 
            style={{ fontSize: "12px",fill: '#fff' }}/>
          <YAxis tickLine={false} 
            style={{ fontSize: "12px" ,fill: '#fff' }} 
            domain={['auto', 'auto']}/>
          <Tooltip />
          <Legend wrapperStyle={{ bottom: 55, left: 20 }} verticalAlign="bottom"/>
          <Bar dataKey="Associate" stackId="a" fill="#D0BBFF" fillOpacity={0.9}/>
          <Bar dataKey="Bachelor" stackId="a" fill="#B79EFF" fillOpacity={0.9}/>
          <Bar dataKey="Master" stackId="a" fill="#A66CFF" fillOpacity={0.9} />
          <Bar dataKey="Doctoral" stackId="a" fill="#7E43AA" fillOpacity={0.9}/>
        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;