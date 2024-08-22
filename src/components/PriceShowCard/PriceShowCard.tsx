import { AlphaVantagePriceDataType } from '../../hooks/useAlphaVantageData/useAlphaVantageData'
import TextDisplay from '../TextDisplay/TextDisplay'

const PriceShowCard = ({
  cardData,
}: {
  cardData: { title: string } & AlphaVantagePriceDataType
}) => {
  return (
    <div className="w-full shadow-lg rounded-lg p-8 grid gap-4">
      <h3 className="text-lg font-bold">{cardData.title}</h3>
      <TextDisplay leftText="Open:" rightText={cardData['1. open']} />
      <TextDisplay leftText="High:" rightText={cardData['2. high']} />
      <TextDisplay leftText="Low:" rightText={cardData['3. low']} />
      <TextDisplay leftText="Close:" rightText={cardData['4. close']} />
      <TextDisplay leftText="Volume:" rightText={cardData['5. volume']} />
    </div>
  )
}

export default PriceShowCard
