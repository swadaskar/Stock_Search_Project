import TickerDetails from './Summary/TickerDetails';
import CompanyDescription from './Summary/CompanyDescription';
import DailyChart from './Summary/DailyChart';

export default function Summary () {

  return (
    <div className='container p-2'>
      <div className='row'>
        <div className='col-md-6'>
          <TickerDetails/>
          <CompanyDescription/>
        </div>
        <div className='col-md-6 text-center'><DailyChart /></div>
      </div>
    </div>
  )
}
