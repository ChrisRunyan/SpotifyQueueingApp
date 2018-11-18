
export class FirebaseWrapper {
  constructor(socket) { 
    this.socket = socket
  }

  joinRoom = (roomId, username = 'default') => {
    this.socket.emit("firebase-join", roomId, username)
  }

  createRoom = (roomCode, roomName, username, access_token) => {
    this.socket.emit('firebase-create', roomCode, roomName, username, access_token)
  } 

}