import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const [data , setData] = useState([]);
  const [searchValue , setSearchValue] = useState("");
  const [renderData, setRenderData] = useState([]);

  useEffect(()=>{
    try{
      async function fetchData(){
        const response = await fetch('https://api.sampleapis.com/beers/ale');
      
        const values = await response.json();
  
        setData(values);
        setRenderData(values)
      }

      fetchData();
      
    }catch(err){
      console.log(err, "problem in fetching the data");
    }
  },[])

  useEffect(()=>{
    if(searchValue == ''){
      setRenderData(data);
    }else{
      const newRenderData = data.filter((product)=> product.name.toLowerCase().includes(searchValue.toLowerCase()))
      setRenderData(newRenderData)
    }
  },[searchValue])

  return (
      <>
          <div className='m-4 border rounded-md px-2'>
              <input 
                className='w-screen h-10'
                placeholder='Search'
                type="text" 
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
              />
          </div>
          <div className='grid grid-cols-3 '>
            {renderData.map((product)=>(
              <div className='border rounded-lg shadow-md m-2 flex flex-col p-2 '>
                 <img className='w-28 h-28' src={product.image} alt="image"  />
                 <h3>{product.name}</h3>
                 <h1>{product.price}</h1>
                 <h2>Rating {Math.round(product.rating.average*10)/10} ⭐</h2>
              </div>
              ))}
          </div>
      </>
  )
}

export default App
