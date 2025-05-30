import { useEffect, useState } from 'react';
import PopularityChart from './components/PopularityChart';
import themeData from './data/legoColorThemes.json';

interface ColorData {
  color: string;
  count: number;
}

interface ThemeData {
  theme_name: string;
  data: ColorData[];
}

function App() {
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    setThemes(themeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">LEGO Color Distribution</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-16">
          {themes.map((theme) => (
            <PopularityChart 
              key={theme.theme_name}
              data={theme.data} 
              title={theme.theme_name} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App; 