import { toast } from 'react-toastify'
import { acceptRejectImage } from '../services'
import PrismaZoom from 'react-prismazoom'

export default function Carousel({
  data,
  click,
  setClick,
  imageNo,
  setImageNo,
  setCompleted,
}) {
  async function Accept() {
    const response = await acceptRejectImage({
      image_id: data[imageNo].image_id,
      application_id: 8979,
      applicant_id: 8800,
      url: window.location.href,
      action: 'Approve',
    })

    if (response.success) {
      toast('Accepted')
      setImageNo((imageNo) =>
        imageNo === data.length - 1 ? imageNo : imageNo + 1
      )
    } else {
      toast('Error')
    }
  }

  async function Reject() {
    const response = await acceptRejectImage({
      image_id: data[imageNo].image_id,
      application_id: 8979,
      applicant_id: 8800,
      url: window.location.href,
      action: 'Reject',
    })
    if (response.success) {
      toast('Rejected')
      setImageNo((imageNo) =>
        imageNo === data.length - 1 ? imageNo : imageNo + 1
      )
    } else {
      toast('Error')
    }
  }

  return (
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
            onClick={() => setCompleted(true)}
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
  )
}
