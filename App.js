import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { acceptRejectImage } from './services'
import PrismaZoom from 'react-prismazoom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/scans').then((res) => {
      setData(res.data)
    })
  }, [])
  const [imageNo, setImageNo] = useState(0)
  const [click, setClick] = useState(false)

  function Accept() {
    acceptRejectImage({
      image_id: data[imageNo].image_id,
      application_id: 8979,
      applicant_id: 8800,
      url: window.location.href,
      action: 'Approve',
    })
    setImageNo((imageNo) =>
      imageNo === data.length - 1 ? imageNo : imageNo + 1
    )
    toast('Accepted')
  }

  function Reject() {
    acceptRejectImage({
      image_id: data[imageNo].image_id,
      application_id: 8979,
      applicant_id: 8800,
      url: window.location.href,
      action: 'Reject',
    })
    setImageNo((imageNo) =>
      imageNo === data.length - 1 ? imageNo : imageNo + 1
    )
    toast('Rejected')
  }

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
        [{imageNo + 1} of {data.length - 1}]
        <button className='btn' onClick={() => setImageNo(data.length - 1)}>
          Last
        </button>
      </div>
      <div className='carousel'>
        <div
          className='image-container'
          id='imgs'
          onClick={() => setClick(!click)}
        >
          <PrismaZoom>
            <img src={data[imageNo]?.url} alt={data[imageNo]?.image_id} />
          </PrismaZoom>
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
            left: '45%',
            zIndex: '9999',
          }}
        >
          {data[imageNo]?.approved !== null ? (
            data[imageNo]?.approved === '0' ? (
              <button className='btn' onClick={Accept}>
                Accept
              </button>
            ) : (
              <button className='btn' onClick={Reject}>
                {console.log(data[imageNo]?.approved)}
                Reject
              </button>
            )
          ) : (
            <div>
              <button className='btn' onClick={Accept}>
                Accept
              </button>
              <button className='btn' onClick={Reject}>
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
    </div>
  )
}

export default App
