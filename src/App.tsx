import { useEffect, useState } from 'react';
import PopularityChart from './components/PopularityChart';
import themeData2023 from './data/legoThemeColors2023-2024.json';

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
  const [themes2023, setThemes2023] = useState<ThemeData[]>([]);

  useEffect(() => {
    setThemes2023(themeData2023);
  }, []);

  const filterThemesByAudience = (themes: ThemeData[], audience: string) => {
    return themes.filter(theme => theme.audience === audience);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="w-full px-4 mx-auto" style={{ maxWidth: '2400px' }}>
        <h1 className="text-4xl font-bold text-center mb-8">LEGO Color Distribution</h1>
        
        {/* 2023-2024 Data */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">2023-2024</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Adult Themes */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold text-center mb-6">Adult Themes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-y-12">
                {filterThemesByAudience(themes2023, "Adult").map((theme) => (
                  <PopularityChart 
                    key={`2023-adult-${theme.theme_name}`}
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
                {filterThemesByAudience(themes2023, "Kid").map((theme) => (
                  <PopularityChart 
                    key={`2023-kid-${theme.theme_name}`}
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