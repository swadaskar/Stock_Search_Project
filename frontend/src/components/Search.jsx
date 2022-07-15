import axios from 'axios'
import '../css/Search.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Search () {
  const [text, setText] = useState('')
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const loadcompanies = async () => {
      let options = {
        method: 'GET',
        url: `http://localhost:5000/searchutil/${text}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      let response = await axios(options).catch(function (error) {
        console.log(`Error received:${error}`)
      })
      console.log(response.data)
      setCompanies(response.data)
    }
    loadcompanies()
  }, [text])

  const onChangeHandler = value => {
    setText(value)
  }
  const onSuggestHandler = value => {
    setText(value)
    setCompanies([])
  }

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // 👇️ redirect to /contacts
    navigate(`/details/${text}`);
  };


  return (
    <div className='mx-auto mt-5 w-50 p-5'>
      <h1 className='text-center mb-3'>STOCK SEARCH</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-group rounded'>
          <input
            type='text'
            className='form-control rounded'
            placeholder='Search'
            value={text}
            onChange={e => onChangeHandler(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setCompanies([])
              }, 500)
            }}
          />
          <span className='input-group-text border-0' id='search-addon'>
            <button className='btn' type='submit'>
                <FaSearch />
            </button>
          </span>
        </div>
      </form>
      {companies &&
        companies.slice(0, 3).map((company, index) => {
          return (
            <div
              key={index}
              className='suggestions form-control form-control-sm rounded-sm'
              onClick={() => onSuggestHandler(company.ticker)}
            >
              <h3>{company.ticker}</h3>
              <p>{company.name}</p>
            </div>
          )
        })}
    </div>
  )
}
