import PopularityChart from './components/PopularityChart'

const nameData = [
  { name: 'Emma', count: 120, color: '#FF6B6B' },
  { name: 'Liam', count: 85, color: '#4ECDC4' },
  { name: 'Olivia', count: 200, color: '#45B7D1' },
  { name: 'Noah', count: 45, color: '#96CEB4' },
  { name: 'Ava', count: 150, color: '#FFEEAD' }
]

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Name Popularity</h1>
        <PopularityChart data={nameData} />
      </div>
    </div>
  )
}

export default App 