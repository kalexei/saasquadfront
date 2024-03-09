"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";

const SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:1234";

const VideoInputField: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setVideoFile(file);
  };

  const sendVideo = async () => {
    const response = await axios.post(SERVER_URL, { video_url: videoUrl });
    console.log(response.data);
  };

  return (
    <div>
      <div>
        <label htmlFor={"urlInput"}>Enter YouTube Video URL:</label>
        <input
          id="urlInput"
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          pattern="^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(\S*?\&)?v=|(embed|v)\/|\S*?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})"
          placeholder="https://www.youtube.com/watch?v=your-video-id"
          className={"px-4 py-2 text-black"}
        />
      </div>

      <div>
        <label>Or Upload MP4 File:</label>
        <input type="file" accept=".mp4" onChange={handleFileChange} />
      </div>

      <div className={"flex justify-center"}>
        <button
          disabled={videoUrl ? false : true}
          className={"border-2 rounded-lg p-2"}
          onClick={() => {
            sendVideo();
          }}
        >
          Cut it up!
        </button>
      </div>

      {videoFile && (
        <video controls>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {videoUrl && (
        <div>
          <p>YouTube Video Preview:</p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoUrl.split("=")[1]}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoInputField;
