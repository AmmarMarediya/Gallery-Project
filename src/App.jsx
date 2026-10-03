import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'

const App = () => {
  const [userData, setUserData] = useState([])
  const [page, setPage] = useState(1)


  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=12`)
    setUserData(response.data)

    console.log(page);

  }

  useEffect(() => {
    getData()
  }, [page])


  let printUserData = <h3 className='text-gray-500 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</h3>

  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => {
      return <div>
        <div key={idx} className=' w-50 h-50 rounded border overflow-hidden'>
          <img className='w-full h-full' src={elem.download_url} alt="" />


        </div>
          <h3>{elem.author}</h3>
      </div>
    })
  }
  return (
    <div>


      <div className='flex flex-wrap gap-2 p-3 h-full'>
        {printUserData}
        <div className='flex gap-5  w-full items-center justify-center fixed bottom-2'>
          <button 
          style={{opacity: page == 1? 0.5 : 1}}
          onClick={() => {

            if (page > 1) {

              setPage(page - 1)
              setUserData([])
            }
          }} className='bg-amber-400 active:scale-95 border rounded  px-2 text-black'>Prev</button>
          <h1>Page {page}</h1>
          <button onClick={() => {
            setPage(page + 1)
            setUserData([])
          }} className='active:scale-95 border rounded  px-2 bg-amber-400 text-black'>Next</button>
        </div>

      </div>
    </div>
  )
}

export default App
