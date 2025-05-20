import { result } from './results/results.js'

export const services = (app) => {
  app.configure(result)

  // All services will be registered here
}
