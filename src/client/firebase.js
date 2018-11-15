import { Room } from './classes/FirebaseData'

export class FirebaseWrapper {
  constructor() { }

  joinRoom = roomId => {
    return fetch(`/api/fire/join/${roomId}`)
    .then(res => res.json())
    .then(room => {
      // return room
      return new Room(room)
    })
  }

}