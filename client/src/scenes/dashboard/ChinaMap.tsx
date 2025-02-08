import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/map/js/china';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

type ProvinceData = {
  province: string;
  'AI & Analytics': number;
  'Backend Development': number;
  'Frontend Development': number;
  'Others': number;
  'System Admin': number;
};

type MapDataItem = {
  name: string;
  value: number;
};


const ChinaMap = () => {
  const [mapData, setMapData] = useState([]);
  const [category, setCategory] = useState('AI & Analytics');  // Default category restored
  const [provinceData, setProvinceData] = useState<ProvinceData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/csv/province-data')
      .then(response => response.json())
      .then(data => {
        setProvinceData(data);
        updateMapData(data, 'AI & Analytics');  // Default category data load
      })
      .catch(error => console.error("Error fetching province data:", error));
  }, []);

  useEffect(() => {
    updateMapData(provinceData, category); // Update map data when category changes
  }, [category, provinceData]);

  const updateMapData = (data: ProvinceData[], category: string) => {
    const formattedData: MapDataItem[] = data.map(item => ({
      name: item.province,
      value: Number(item[category]) // Ensure the value is a number
    })).filter(item => item.name && item.value !== undefined); // Check for undefined values

    setMapData(formattedData);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.name} has ${params.value} ${category} positions`
    },
    visualMap: {
      min: 0,
      max: mapData.reduce((max, item) => Math.max(max, item.value), 0),  // Dynamically adjust scale
      text: ['High', 'Low'],
      realtime: true,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '8%',
      itemWidth: 28,  
      itemHeight: 300,
      textStyle: {
        color: '#fff'
      },
      inRange: {
        color: ['#edf8fb', '#b3cde3', '#9967e9', '#810f7c']
        // color: ['#edf8fb', '#13e4fe', '#9967e9','#de4ae3']
      }
    },
    series: [{
      name: 'Data',
      type: 'map',
      mapType: 'china',
      data: mapData,
      emphasis: {
        itemStyle: {
          areaColor: null, 
          borderWidth: 0.5,       
          borderColor: '#fff',  
          shadowBlur: 10,       
          shadowColor: 'rgba(0, 0, 0, 0.5)' 
        },
        label: {
          show: false 
        }
      },
    }]
  });
  

  return (
    <>
      <FormControl 
        sx={{
          width: '50%',     
          mt: 2,
          ml: 2,            
          alignSelf: 'flex-end',
          zIndex: 1000
        }}
      >
        <InputLabel id="category-select-label" style={{ color: '#fff' }}>Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
          style={{ color: '#fff', backgroundColor: '#555' }}
        >
          <MenuItem value="AI & Analytics">AI & Analytics</MenuItem>
          <MenuItem value="Backend Development">Backend Development</MenuItem>
          <MenuItem value="Frontend Development">Frontend Development</MenuItem>
          <MenuItem value="System Admin">System Admin</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
      <ReactEcharts option={getOption()} style={{ height: '100%', width: '100%', marginTop: '-100px' }} />
    </>
  );
};

export default ChinaMap;
