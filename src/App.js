import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/scans').then((res) => {
      setData(res.data)
    })
  }, [])
  const [imageNo, setImageNo] = useState(0)
  const [click, setClick] = useState(false)
  return (
    <div className='App'>
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          top: '0%',
          left: '40%',
          zIndex: '9999',
        }}
      >
        <button className='btn' onClick={() => setImageNo(0)}>
          First
        </button>
        [{imageNo} of {data.length - 1}]
        <button className='btn' onClick={() => setImageNo(data.length - 1)}>
          Last
        </button>
      </div>
      <input type='checkbox' id='zoomCheck' />
      <div className={click === true ? 'carousel-zoomed' : 'carousel'}>
        <div
          className='image-container'
          id='imgs'
          onClick={() => setClick(!click)}
        >
          <label for='zoomCheck'>
            <img
              src={data[imageNo]?.url}
              className={click === true ? 'zoomed' : 'zoom'}
            />
          </label>
        </div>
        <div class='buttons-container'>
          <button
            id='left'
            class='btn'
            onClick={() =>
              setImageNo((imageNo) => (imageNo === 0 ? imageNo : imageNo - 1))
            }
          >
            Prev
          </button>

          {data.length - 1 === imageNo ? (
            <button
              className='btn-complete'
              id='right'
              onClick={() => console.log('Reject')}
            >
              Complete
            </button>
          ) : (
            <button
              id='right'
              class='btn'
              onClick={() =>
                setImageNo((imageNo) =>
                  imageNo === data.length - 1 ? imageNo : imageNo + 1
                )
              }
            >
              Next
            </button>
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            bottom: '0%',
            left: '40%',
            zIndex: '9999',
          }}
        >
          {data[imageNo]?.approved !== null ? (
            data[imageNo]?.approved === '0' ? (
              <button className='btn' onClick={() => console.log('Accept')}>
                {console.log(data[imageNo]?.approved)}
                Accept
              </button>
            ) : (
              <button className='btn' onClick={() => console.log('Reject')}>
                {console.log(data[imageNo]?.approved)}
                Reject
              </button>
            )
          ) : (
            <div>
              <button className='btn' onClick={() => console.log('Accept')}>
                Accept
              </button>
              <button className='btn' onClick={() => console.log('Reject')}>
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
