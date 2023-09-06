import type { ComputedRef } from "vue"

export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export interface IWeatherBrief {
  weekDay: string
  temperature: number
}

export interface IWeather extends IWeatherBrief {
  timestamp: number
  temperature: number
  wind: number
  clouds: number
  humidity: number
  description: string
}

export interface IHistoryItem {
  id: number
  value: string
}

export interface IFavoriteCity {
  id: number
  name: string
}

export interface IUserBrief {
  username: string
  password: string
}

export interface IUser extends IUserBrief {
  id: number
  token: string
}

export class CityNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CityNotFoundError'
  }
}

export interface IAppState {
  isRequestPending: boolean
  errorMessage: string
  windowWidth: ComputedRef<number>
  isMobile: ComputedRef<boolean>
  requestsPerHour: ComputedRef<number>
  lastRequestTime: number
  canSendUnauthenticatedRequest: ComputedRef<boolean>
}