// import { useState } from 'react'
// import './App.css'
// import { useNavigate } from 'react-router-dom';

// function App() {

//   const [roomID,setRoomID] = useState("");
//   const navigate = useNavigate();

//   const generateRoomID = () => {
//     const randomRoomID = Math.random().toString(36).substring(2,9);
//     const curruntTime = Date.now().toString().substring(-4);
//     setRoomID(randomRoomID + curruntTime);
//   }

//   const handleOneOnOneCall = (roomID) => {
//     if(!roomID){
//       alert('Room ID is required to make video calls & meetings');
//       return;
//     }
//     alert("Generated Room ID = " + roomID);
//     navigate(`/room/${roomID}?type=one-on-one`);
//   }

//   const handleGroupCall = (roomID) => {
//     if(!roomID){
//       alert('Room ID is required to make video calls & meetings');
//       return;
//     }
//     alert("Generated Room ID = " + roomID);
//     navigate(`/room/${roomID}?type=group-call`);
//   }

//   return (
//     <>
//       <div className='main-body h-screen w-screen flex items-center justify-center'>
//         <div className='container-class w-full flex items-center justify-center'>
//           <div className='box-1 flex flex-col gap-4 w-6/12 bg-blue-400 p-5'>
//             <div className='content'>
//               <h2 className='text-3xl text-center font-medium'>Video Call & Meetings</h2>
//               <h4 className='text-center'>Generate Room ID to start video call & group meetings.</h4>
//             </div>
//             <div className='flex gap-3 items-center justify-center'>
//               <input 
//                 type="text" 
//                 placeholder='Room ID' 
//                 className='p-2 rounded-md w-6/12 outline-none text-center'
//                 value={roomID}
//                 readOnly
//               />
//               <button 
//                 onClick={generateRoomID}
//                 className='px-4 py-2 border-white border-2 rounded-lg text-white hover:text-black hover:bg-white hover:shadow-lg'
//               >Generate Room ID</button>
//             </div>
//             <div className='btn-container flex gap-5 items-center justify-center'>
//               <button 
//                 className='cursor-pointer px-5 py-2 border-2 border-slate-800 bg-slate-800 text-white rounded-lg hover:bg-white hover:text-black'
//                 // disabled={!roomID}
//                 onClick={() => handleOneOnOneCall(roomID)}
//               >One-on-One Call</button>
//               <button 
//                 className='cursor-pointer px-5 py-2 border-2 border-slate-800 bg-slate-800 text-white rounded-lg hover:bg-white hover:text-black'
//                 disabled={!roomID}
//                 onClick={() => handleGroupCall(roomID)}
//               >Group Call</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App

import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  const generateRoomID = () => {
    const randomRoomID = Math.random().toString(36).substring(2, 9);
    const currentTime = Date.now().toString().slice(-4);
    setRoomID(randomRoomID + currentTime);
  };

  const handleOneOnOneCall = (roomID) => {
    if (!roomID) {
      alert("Room ID is required to make video calls & meetings");
      return;
    }
    alert("Generated Room ID = " + roomID);
    navigate(`/room/${roomID}?type=one-on-one`);
  };

  const handleGroupCall = (roomID) => {
    if (!roomID) {
      alert("Room ID is required to make video calls & meetings");
      return;
    }
    alert("Generated Room ID = " + roomID);
    navigate(`/room/${roomID}?type=group-call`);
  };

  return (
    <div className="main-body">
      <div className="container-class">
        <div className="box">
          <div className="content">
            <h2 className="title">Video Call & Meetings</h2>
            <h4 className="subtitle">
              Generate Room ID to start video calls & group meetings.
            </h4>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Room ID"
              className="room-input"
              value={roomID}
              readOnly
            />
            <button className="generate-btn" onClick={generateRoomID}>
              Generate Room ID
            </button>
          </div>
          <div className="btn-container">
            <button
              className="call-btn"
              onClick={() => handleOneOnOneCall(roomID)}
            >
              One-on-One Call
            </button>
            <button
              className="call-btn"
              onClick={() => handleGroupCall(roomID)}
              disabled={!roomID}
            >
              Group Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
