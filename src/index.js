import express, { request, response } from 'express'

import { createClient } from 'redis'
import responseTime from 'response-time'

import api from './api.js'

const client = createClient({
  host: 'localhost',
  port: 6379
})

const server = express()
const PORT = process.env.PORT || 3000

server.use(responseTime())

server.get('/character', async (req = request, res = response) => {
  try {
    await client.connect()
    const value = await client.get('characters')
    // si ya existe en redis, se devuelve ese valor
    if (value) return res.json(JSON.parse(value))

    const resp = await api.get('/character')
    // guardando petición en redis en caso de no existir (solo guarda string)
    await client.set('characters', JSON.stringify(resp.data))
    res.json(resp.data)
  } catch (error) {
    res.status(error.response.status).json({
      message: error.message
    })
  } finally {
    await client.disconnect()
  }
})

server.get('/character/:id', async (req = request, res = response) => {
  const { id } = req.params

  try {
    await client.connect()
    const value = await client.get(id)
    if (value) return res.json(JSON.parse(value))

    const resp = await api.get(`/character/${id}`)
    await client.set(id, JSON.stringify(resp.data))
    res.json(resp.data)
  } catch (error) {
    res.status(error.response.status).json({
      message: error.message
    })
  } finally {
    await client.disconnect()
  }
})

server.listen(PORT, () => console.log('Server on port', PORT))
