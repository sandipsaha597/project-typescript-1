import './App.css'
import AsyncDataDisplay from './components/AsyncDataDisplay/AsyncDataDisplay'
import PriceShowCard from './components/PriceShowCard/PriceShowCard'
import TextDisplay from './components/TextDisplay/TextDisplay'
import { useAlphaVantageData } from './hooks/useAlphaVantageData/useAlphaVantageData'

function App() {
  const { err, metaData, today, yesterday } = useAlphaVantageData()

  return (
    <div className="container py-10">
      <AsyncDataDisplay err={err}>
        <h1 className="text-5xl font-bold mb-14">
          {metaData['1. Information']}
        </h1>
        <section className="max-w-xl shadow-lg rounded-lg p-8 grid gap-4">
          <TextDisplay
            leftText="Symbol:"
            rightText={metaData['2. Symbol']}
            fontSize="text-2xl"
            textColor="text-grey-900"
          />
          <div className="flex gap-10">
            <PriceShowCard cardData={{ title: 'Yesterday', ...yesterday }} />
            <PriceShowCard cardData={{ title: 'Today', ...today }} />
          </div>
        </section>
      </AsyncDataDisplay>
    </div>
  )
}

export default App
