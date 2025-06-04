import { useEffect, useState } from 'react';
import PopularityChart from './components/PopularityChart';
import themeData2020 from './data/legoThemeColors_2020_2024.json';
import themeData2015 from './data/legoThemeColors_2015_2019.json';

interface ColorData {
  color: string;
  count: number;
}

interface ThemeData {
  theme_name: string;
  total_count: number;
  audience: string;
  data: ColorData[];
}

function App() {
  const [selectedYear, setSelectedYear] = useState('2020-2024');
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    // Load data based on selected year
    if (selectedYear === '2020-2024') {
      setThemes(themeData2020);
    } else if (selectedYear === '2015-2019') {
      setThemes(themeData2015);
    }
  }, [selectedYear]);

  const filterThemesByAudience = (themes: ThemeData[], audience: string) => {
    return themes.filter(theme => theme.audience === audience);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="w-full px-4 mx-auto" style={{ maxWidth: '2400px' }}>
        <h1 className="text-4xl font-bold text-center mb-8">LEGO Color Distribution</h1>
        
        {/* Year Selection Dropdown */}
        <div className="flex justify-center mb-8">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="2020-2024">2020-2024</option>
            <option value="2015-2019">2015-2019</option>
          </select>
        </div>

        {/* Data Display */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">{selectedYear}</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Adult Themes */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold text-center mb-6">Adult Themes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-y-12">
                {filterThemesByAudience(themes, "Adult").map((theme) => (
                  <PopularityChart 
                    key={`${selectedYear}-adult-${theme.theme_name}`}
                    data={theme.data} 
                    title={theme.theme_name}
                    total_count={theme.total_count}
                  />
                ))}
              </div>
            </div>

            {/* Kids Themes */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold text-center mb-6">Kids Themes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-y-12">
                {filterThemesByAudience(themes, "Kid").map((theme) => (
                  <PopularityChart 
                    key={`${selectedYear}-kid-${theme.theme_name}`}
                    data={theme.data} 
                    title={theme.theme_name}
                    total_count={theme.total_count}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 