import axios from "axios";
import { useEffect, useState } from "react"

export default function App(){
  const [data,setData] = useState<string>();

  const [currentInput, setCurrentInput] = useState<string>("");
  
  

  const featchData = async() => {
    try {
      if(!currentInput)
        return;
      console.log(currentInput)
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentInput.toLowerCase()}`)
      setData(response.data)

    } catch (err) {
      console.log(err)
      setData("");
    }
  }
  return (
    <>
    <div className="flex flex-col justify-center items-center pt-20">
      <h1 className="text-2xl">Data from Api</h1>
    
    <div className="gap-2 flex justify-between">
      <label >For who forget: charizard</label>
      <input className="border " placeholder="pokemon name" type="text" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}/>
      <button className="border" onClick={() => {
        featchData()
      }}>Search</button>
      </div>
      
      {data && (
        <div className="font-sans text-xl pt-2 ">
          <h4>ID: {data.id}</h4>
          <h4>Name : {data.name}</h4>
          <h4>Height: {data.height}</h4>

          <div className="gap-2 mb-6">
            <h4 >Type: {data.types.map((e) => (
            <span className="p-2" >
            {e.type.name}
            </span>
            ))}
          </h4>
          </div>

          <img className="w-50 " src={data.sprites?.front_default} alt="" />
        </div>
      )}
    </div>
    
    </>)
}