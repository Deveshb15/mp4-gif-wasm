import { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: true })

function App() {

  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState()

  const load = async() => {
    await ffmpeg.load()
    setReady(true)
  }

  useEffect(() => {
    load()
  }, [])

  console.log(video)
  // console.log(URL.createObjectURL(video))

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      {
        ready ? (
          <div>
            {
              video && (
                <video 
                  controls
                  width="250px"
                  src={URL.createObjectURL(video)}
                />
              )
            }

            <input type="file" onChange={(e) => setVideo(e.target?.files?.item(0))} />
          </div>
        ) : (
          <h1 className="text-3xl font-bold">Loading...</h1>
        )
      }
    </div>
  );
}

export default App;
