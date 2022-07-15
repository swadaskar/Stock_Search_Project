export default function MiddleDetails ({ latestPrice }) {
  const status = (((new Date()).getTime() - Date.parse(latestPrice.timestamp)) / 1000) > 60 ? false : true
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='p-2 mb-5 bd-highlight'>
          <p>Market is {status?"Open":"Closed"}</p>
        </div>
      </div>
    </>
  )
}
