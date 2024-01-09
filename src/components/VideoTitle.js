import React from 'react'

const VideoTitle = ( {title, overview} ) => {
  return (
    <div className="pt-36 px-12" >
        <h1 className=" text-6xl font-bold" >{title}</h1>
        <p className="py-6 text-lg w-1/3  " >{overview}</p>
        <div>
            <button className="mx-2 bg-gray-500 text-white p-4 px-16 rounded-lg cursor-pointer text-lg bg-opacity-50 " > ▶️ Play</button>
            <button className="mx-2 bg-gray-500 text-white p-4 px-16 rounded-lg cursor-pointer text-lg bg-opacity-50 " >More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle