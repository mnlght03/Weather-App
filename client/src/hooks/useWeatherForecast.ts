import { useAppStateStore } from '@/stores/useAppStateStore'
import { WeekDay, type IWeather, CityNotFoundError } from '@/types'
import axios from 'axios'
import { onMounted, ref, watch, type Ref } from 'vue'

const getCityData = async (city: string) => {
  const { data } = await axios({
    method: 'get',
    url: import.meta.env.VITE_APP_WEATHER_API_BASE + '/geo/1.0/direct',
    params: {
      q: city,
      appid: import.meta.env.VITE_APP_API_KEY
    },
    timeout: 10000
  })

  return data
}

const getResponseByWeekdays = async (lat: number, lon: number) => {
  const { data } = await axios({
    method: 'get',
    url: import.meta.env.VITE_APP_WEATHER_API_BASE + '/data/2.5/forecast',
    params: {
      lat: lat,
      lon: lon,
      units: 'metric',
      appid: import.meta.env.VITE_APP_API_KEY
    },
    timeout: 10000
  })

  const daySet = new Set()

  return data.list.filter((item: any) => {
    const day = new Date(item.dt * 1000).getDay()
    if (!daySet.has(day)) {
      daySet.add(day)
      return true
    }
    return false
  })
}

const getWeatherData = async (lat: number, lon: number): Promise<IWeather[]> => {
  const responseByWeekdays = await getResponseByWeekdays(lat, lon)

  const weather = responseByWeekdays.map((item: any) => {
    const date = new Date(item.dt * 1000)

    return {
      timestamp: item.dt,
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
      wind: item.wind.speed,
      clouds: item.clouds.all,
      description: item.weather[0].main,
      weekDay: WeekDay[date.getDay()],
      time: `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    }
  })

  return weather
}

export const useWeatherForecast = (city: Ref<string>) => {
  const weatherItems = ref([] as IWeather[])
  const currentWeather = ref({} as IWeather)
  const updateCurrent = (item: IWeather) => (currentWeather.value = item)

  const { appState } = useAppStateStore()

  const fetchData = async () => {
    console.log('fetching weather data...')
    if (Date.now() - appState.lastRequestTime >= 60 * 60 * 1000) {
      appState.requestsPerHour = 0
    }

    if (!appState.canSendUnauthenticatedRequest) {
      console.log('Too many requests for unauthorized user.')
      return;
    }

    appState.errorMessage = ''
    appState.isRequestPending = true
    appState.lastRequestTime = Date.now()
    appState.requestsPerHour++

    try {
      const cityData = await getCityData(city.value)

      if (cityData.length === 0 || !cityData[0].local_names) {
        appState.errorMessage = `City '${city.value}' not found`
        throw new CityNotFoundError('City not found')
      }

      const lat = cityData[0].lat
      const lon = cityData[0].lon

      const forecast = await getWeatherData(lat, lon)
      weatherItems.value = forecast
      currentWeather.value = forecast[0]
    } catch (e) {
      console.log(e)
    }
    appState.isRequestPending = false
  }

  onMounted(fetchData)

  watch(city, fetchData)

  return {
    weatherItems,
    currentWeather,
    updateCurrent
  }
}
