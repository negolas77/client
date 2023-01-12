// SongList.js
import React, { useState } from "react";
import axios from "axios";

const SongList = () => {
  const [NFTid, setNFTid] = useState(0);
  const [NFTartist, setNFTartist] = useState("");
  const [NFTsongname, setNFTsongname] = useState("");
  const [NFTduration, setNFTduration] = useState("");
  const [NFTsongrelease, setNFTsongrelease] = useState(0);
  const [NFTtimestamp, setNFTtimestamp] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [borrowed, setborrowed] = useState([]);

  const fetchSongs = () => {
    console.log("fetchSongs");
    axios.get("http://localhost:3001/songs").then((response) => {
      console.log(response);
      setSongs(response.data);
    });
  };

  const handleSelect = (song) => {
    setSelectedSong(song);
  };

  const handleBorrow = () => {
    axios
      .post("http://localhost:3001/borrow", {
        NFTid: selectedSong.NFTid,
        NFTartist: selectedSong.NFTartist,
        NFTsongname: selectedSong.NFTsongname,
        NFTduration: selectedSong.NFTduration,
        NFTsongrelease: selectedSong.NFTsongrelease,
      })
      .then((response) => {
        setSongs(response.data);
      });
    fetchSongs();
    setSelectedSong(null);
  };

  return (
    <div>
      <button onClick={fetchSongs}>Fetch Songs</button>
      <ul>
        {songs.map((song) => (
          <li key={song.NFTid}>
            <p>
              {song.NFTartist +
                " " +
                song.NFTsongname +
                " " +
                song.NFTduration +
                "min " +
                song.NFTsongrelease}
            </p>
            <button onClick={() => handleSelect(song)}>Select</button>
            {song.borrowed ? <p>Borrowed</p> : null}
          </li>
        ))}
      </ul>
      {selectedSong ? (
        <div>
          <p>
            You have selected:{" "}
            {selectedSong.NFTartist +
              selectedSong.NFTsongname +
              selectedSong.NFTduration +
              selectedSong.NFTsongrelease}
          </p>
          <button onClick={handleBorrow}>Borrow</button>
        </div>
      ) : null}
    </div>
  );
};

export default SongList;
