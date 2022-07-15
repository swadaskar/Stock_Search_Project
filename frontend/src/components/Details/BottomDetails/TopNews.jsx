import { useContext } from "react"
import { stockContext } from "../../../Contexts/stockContext"

export default function TopNews() {
  const { newsData } = useContext(stockContext)
  return (
    <>
      <div className='container p-2'>
        <div className='row'>
          {newsData.articles.map((article, index) => {
            return (<div className='col-md-6'>
              <div className="card m-3" key={index}>
                <img className="card-img-top p-2" src={article.urlToImage} alt="News Image"></img>
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a href={article.url} className='btn btn-primary'>
                    Read More
                  </a>
                </div>
              </div>
            </div>)
          })}
        </div>
      </div>
    </>
  )
}