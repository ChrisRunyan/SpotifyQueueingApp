const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;

this.songs = [
    {
      title: "Chicago",
      artist: "Sufjan Stevens",
      album: "Illinois",
      songLength: "6:05",
      votes: 5,
      id: 0
    },
    {
      title: "Dean Town",
      artist: "Vulfpeck",
      album: "The Beautiful Game",
      songLength: "3:33",
      votes: 3,
      id: 1
    },
    {
      title: "What I Got",
      artist: "Sublime",
      album: "Sublime",
      songLength: "2:51",
      votes: 0,
      id: 2
    },
  ]

this.newSong = {
  title: "Spring Break 1899",
  artist: "Murder By Death",
  album: "Red of Tooth and Claw",
  songLength: "5:56",
  votes: 0,
  id: 3
}

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  console.log("how bout here")
  try {
      // console.log(this.songs);
      socket.emit("initialLoad", this.songs);
  } catch(error) {
      console.log("here?")
      console.error(`Error: ${error.code}`);
  }

  interval = setInterval(() => resortAndLoad(socket), 10000);

  console.log("do i ever get here");
  socket.on("addSong", () => {
    try{
      console.log("heeeeelllo?")
      socket.emit("song", this.newSong )
      console.log("sent", this.newSong)
    } catch(error) {
      console.log("here?")
      console.error(`Error: ${error.code}`);
    }
  })

  socket.on("changeVote", (index, delta) => {
    console.log("what is index", index, "what is delta", delta)
    console.log("changing votes of", this.songs[index].title);
    this.songs[index].votes+= delta;
    console.log(this.songs)
  })
  


//   interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const resortAndLoad = async socket => { // Gonna change this to work for me
    try {
      console.log("new songs loaded")
      this.songs.sort( (a,b) => {
        return b.votes - a.votes;
      })
      socket.emit("initialLoad", this.songs)
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

server.listen(port, () => console.log(`Listening on port ${port}`));
