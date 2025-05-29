import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import PopularityChart from './components/PopularityChart';
import nameData from './data/nameData.csv?raw';

interface DataItem {
  name: string;
  count: number;
  color: string;
}

function App() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const parsedData = d3.csvParse(nameData, (d: any) => ({
      name: d.name,
      count: +d.count,
      color: d.color
    }));
    setData(parsedData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Name Popularity Chart</h1>
        <PopularityChart data={data} />
      </div>
    </div>
  );
}

export default App; 