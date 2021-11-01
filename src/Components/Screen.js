import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Carousel from './Carousel'

export default function Screen({ setCompleted }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/52e3a356-14be-4efa-a51e-e8560e627158')
      .then((res) => {
        setData(res.data.scans)
      })
  }, [])
  const [imageNo, setImageNo] = useState(0)
  const [click, setClick] = useState(false)

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          top: '0%',
          left: '42%',
          zIndex: '9999',
        }}
      >
        <button className='btn' onClick={() => setImageNo(0)}>
          First
        </button>
        [{imageNo + 1} of {data.length}]
        <button className='btn' onClick={() => setImageNo(data.length - 1)}>
          Last
        </button>
      </div>
      <Carousel
        data={data}
        imageNo={imageNo}
        click={click}
        setClick={setClick}
        setImageNo={setImageNo}
        setCompleted={setCompleted}
      />
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
