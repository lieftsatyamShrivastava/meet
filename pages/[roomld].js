import { useEffect } from "react";
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";

import Player from "@/component/player"; // Corrected the import statement

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();

  useEffect(() =>{
     if(!socket) return;
     const handleUserConnected = (newUser) =>{
          console.log(`user connected in room with userId ${newUser}`)

     }
     socket.on('user-connected' , handleUserConnected)

     return () => {
          socket.off('user-connected',  handleUserConnected)
     }
  },[socket])


  return (
    <div>
      <Player url={stream} muted playing playerId={myId} /> 
    
        happy 
    
    </div>
  );
};

export default Room;
