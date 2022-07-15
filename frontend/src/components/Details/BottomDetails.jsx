import { useState } from 'react';
import Summary from './BottomDetails/Summary';
import TopNews from './BottomDetails/TopNews';
import HistoricalCharts from './BottomDetails/HistoricalCharts';

export default function BottomDetails () {
  const [tab, setTab] = useState('summary');

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div
          className='p-2 flex-fill bd-highlight tabs'
          style={{ borderColor: tab === 'summary' ? 'green' : 'lightgrey' }}
          name='summary'
          onClick={()=>{setTab('summary')}}
        >
          <p className='text-center'>Summary</p>
        </div>
        <div
          className='p-2 flex-fill bd-highlight tabs'
          style={{ borderColor: tab === 'news' ? 'green' : 'lightgrey' }}
          name='news'
          onClick={()=>{setTab('news')}}
        >
          <p className='text-center'>Top News</p>
        </div>
        <div
          className='p-2 flex-fill bd-highlight tabs'
          style={{ borderColor: tab === 'charts' ? 'green' : 'lightgrey' }}
          name='charts'
          onClick={()=>{setTab('charts')}}
        >
          <p className='text-center'>Charts</p>
        </div>
      </div>
      {tab === 'summary' && <Summary />}
      {tab === 'news' && <TopNews />}
      {tab === 'charts' && <HistoricalCharts />}
    </>
  )
}
