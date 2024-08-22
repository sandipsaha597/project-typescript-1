import { ALPHA_VANTAGE_API_ENDPOINT } from '../../constants'
import { useAxios } from '../useAxios/useAxios'

type MetaDataType = {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Output Size': string
  '5. Time Zone': string
}

type MetaDataWithKeyType = {
  'Meta Data': MetaDataType
}

export type AlphaVantagePriceDataType = {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

type TimeSeriesDailyType = {
  'Time Series (Daily)': Record<string, AlphaVantagePriceDataType>
}

type AlphaVantageDataType = MetaDataWithKeyType & TimeSeriesDailyType

export const useAlphaVantageData = () => {
  const { loading, err, data } = useAxios<AlphaVantageDataType>(
    ALPHA_VANTAGE_API_ENDPOINT,
    {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: 'RELIANCE.BSE',
        apikey: import.meta.env.VITE_ALPHAVANTAGE_API_KEY2,
      },
    }
  )

  const loadingString = 'loading...'
  const singularDataPlaceHolder: AlphaVantagePriceDataType = {
    '1. open': loadingString,
    '2. high': loadingString,
    '3. low': loadingString,
    '4. close': loadingString,
    '5. volume': loadingString,
  }
  const metaDataPlaceHolder: MetaDataType = {
    '1. Information': loadingString,
    '2. Symbol': loadingString,
    '3. Last Refreshed': loadingString,
    '4. Output Size': loadingString,
    '5. Time Zone': loadingString,
  }
  const metaData = data?.['Meta Data'] || metaDataPlaceHolder
  const priceData = Object.entries(data?.['Time Series (Daily)'] || {})
  const today = priceData[0]?.[1] || singularDataPlaceHolder
  const yesterday = priceData[1]?.[1] || singularDataPlaceHolder

  return { loading, err, data, metaData, priceData, today, yesterday }
}
