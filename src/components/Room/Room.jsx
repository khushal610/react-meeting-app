import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { APP_ID, SECRET } from '../RoomData/RoomConfiguration';

function Room() {
  const { roomID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState("");

  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = SECRET;
    const userID = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; // Unique ID
    const userName = `User_${userID}`;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    if (!videoContainerRef.current) {
      console.error("Video container is not ready!");
      return;
    }

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: 'Video link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?type=${type}`,
        },
      ],
      scenario: {
        mode: type === "one-on-one" ? ZegoUIKitPrebuilt.OneONoneCall : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        handleExit();
      },
    });
  };

  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy(); // Destroy the instance
      zpRef.current = null; // Ensure it's reset
    }
    navigate('/'); // Redirect to the root page
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");
    setCallType(type);
  }, [location.search]);

  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy(); // Cleanup Zego instance
        zpRef.current = null;
      }
    };
  }, [callType, roomID]);

  return (
    <div className="room-container">
      {!joined && (
        <header className="h-20 flex items-center justify-between w-full text-3xl bg-blue-800 text-white px-10">
          {callType === "one-on-one" ? "One-on-One Video Call" : "Group Meeting"}
          <button
            onClick={handleExit}
            className="border-2 text-sm rounded-md border-blue-500 bg-white text-blue-500 px-6 py-2 hover:bg-blue-500 hover:text-white"
          >
            Exit
          </button>
        </header>
      )}
      <div ref={videoContainerRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}

export default Room;
