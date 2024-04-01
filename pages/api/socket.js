import { Server } from "socket.io";

const socketHandler = (req, res) => {

  console.log("called api")
    if( res.socket.server.io){
        console.log("socket already runing")

    } else{
        const io = new Server(res.socket.server);

        res.socket.server.io = io;
    
        io.on('connection', (socket) => {
            console.log('A client connected')

            socket.on("join-room" ,(roomId, userId) =>{
                console.log(`a new user ${userId} join room ${roomId}`)
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-connected', userId)
            })
        })
    }

    res.end();
    
}

export default socketHandler;



