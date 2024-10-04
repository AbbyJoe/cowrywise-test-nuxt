import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    // const UNSPLASH_ACCESS_KEY = useRuntimeConfig()?.UNSPLASH_ACCESS_KEY
    const axiosInstance = axios.create({
        baseURL: useRuntimeConfig().public.BASE_URL,
    })
  axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Client-ID yNQpTLLG67GlhD2RafyCJfkyAiLbqSAer_mo-zx10Fc`
        return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log(error.response)
      }
      return Promise.reject(error)
    }
  )
  nuxtApp.provide('axios', axiosInstance)
})
