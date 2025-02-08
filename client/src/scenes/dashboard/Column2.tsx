import React, { useState, useEffect } from 'react';
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import ChinaMap from "./ChinaMap";
import {
  Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from "recharts";

const Row2: React.FC = () => {
  const [salaryLocationData, setSalaryLocationData] = useState<SalaryLocationData[]>([]);

  type VisibilityType = {
    Wulumuqi: boolean;
    Shenzhen: boolean;
    Shanghai: boolean;
    Guangzhou: boolean;
  };
  
  type SalaryLocationData = {
    Range: string;
    Wulumuqi: number;
    Shenzhen: number;
    Shanghai: number;
    Guangzhou: number;
  };
  const [visibility, setVisibility] = useState<VisibilityType>({
    Wulumuqi: true,
    Shenzhen: true,
    Shanghai: true,
    Guangzhou: true
  });
  
  useEffect(() => {
    fetch('http://localhost:3000/csv/location-salary')
      .then(response => response.json())
      .then(data => setSalaryLocationData(data))
      .catch(error => console.error("Error fetching location-salary data:", error));
  }, []);


  const salaryLocation = salaryLocationData.map(({ Range,Wulumuqi,Shenzhen,Shanghai,Guangzhou }) => ({
    name: Range,
    Wulumuqi: Wulumuqi,
    Shenzhen: Shenzhen,
    Shanghai: Shanghai,
    Guangzhou: Guangzhou
  }));

  const handleLegendClick = (event: any) => {
    const dataKey = event.dataKey as keyof VisibilityType;
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [dataKey]: !prevVisibility[dataKey],
    }));
  };  

  return (
    <>
      <DashboardBox gridArea="b">
        <BoxHeader 
          title="Location Salary Analysis" 
          subtitle="Radar Chart Analysis of Salary Across Four Province"
          sideText="Location-Salary" />
        <ResponsiveContainer width="100%" height="85%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={salaryLocation}>
            <PolarGrid />
            <PolarAngleAxis 
              dataKey="name" 
              />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              />
            <Radar name="Wulumuqi" dataKey="Wulumuqi" stroke="#13e4fe" fill="#13e4fe" fillOpacity={0.5} hide={!visibility.Wulumuqi} />
            <Radar name="Guangzhou" dataKey="Guangzhou" stroke="#de4ae3" fill="#de4ae3" fillOpacity={0.5} hide={!visibility.Guangzhou} />
            <Radar name="Shenzhen" dataKey="Shenzhen" stroke="#b25eea" fill="#b25eea" fillOpacity={0.5} hide={!visibility.Shenzhen} />
            <Radar name="Shanghai" dataKey="Shanghai" stroke="#D0BBFF" fill="#D0BBFF" fillOpacity={0.5} hide={!visibility.Shanghai} />

            <Legend onClick={handleLegendClick} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <BoxHeader
          title="Job Category Distribution Map"
          subtitle="Map showing job category distribution across China"
          sideText="Provience-Job Category"
        />
        <ResponsiveContainer width="100%" height="100%">
          <ChinaMap />
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
