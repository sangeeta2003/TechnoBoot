import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

export const websocketService = {
  connect: () => {
    socket.connect();
  },

  disconnect: () => {
    socket.disconnect();
  },

  subscribeToDashboardUpdates: (callback) => {
    socket.on('dashboard-update', callback);
  },

  unsubscribeFromDashboardUpdates: () => {
    socket.off('dashboard-update');
  }
};