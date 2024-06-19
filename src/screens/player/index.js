import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import Queue from "../../component/queue";
import SongCard from "../../component/songCard";
import apiClient from "../../spotify";
import AudioPlayer from "../../component/audioPlayer";
import Widgets from "../../component/widgets";
export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setcurrentTrack] = useState({});
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + " /track")
        .then((res) => {
          setTracks(res.data.items);
          setcurrentTrack(res.data.items[0].track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setcurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setcurrentIndex={setcurrentIndex}
        />
        <Widgets artistID={currentTrack?.album} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setcurrentIndex={setcurrentIndex} />
      </div>
    </div>
  );
}
