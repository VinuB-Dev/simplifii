export default function Complete({ setCompleted }) {
  return (
    <div className='complete'>
      <h1>You have reviewed all images</h1>
      <button className='btn1' onClick={() => setCompleted(false)}>
        Close
      </button>
    </div>
  )
}
