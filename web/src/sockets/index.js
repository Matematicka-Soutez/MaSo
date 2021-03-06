import openSocket from 'socket.io-client'
import { API_ADDRESS } from '../config'

const socket = openSocket(API_ADDRESS)

function subscribeToDisplayChange(cb) {
  socket.on('displayChange', displayChangeData => cb(null, displayChangeData))
  socket.emit('subscribeToDisplayChange', 1000)
}

function subscribeToResultsChange(cb) {
  socket.on('resultsChange', results => cb(null, results))
  socket.emit('subscribeToResultsChange', 1000)
}

export {
  subscribeToDisplayChange,
  subscribeToResultsChange,
}

