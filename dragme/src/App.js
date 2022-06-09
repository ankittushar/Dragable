
import { useEffect, useState } from 'react';
import './App.css';
import Alphabet from './components/Alphabet';
import Operator from './components/Operator';

import axios from 'axios';

function App() {

  const[arr,setArr]=useState([])
  const [expression,setExpress]=useState([])
  const[comparator, setComp]=useState("")
  const[rhs,setRhs]=useState("")


  const alpha=['A','B',"C", "D", "E"]
  const operators=["+", "-", "*", "/"]
  const compare=["<", ">"]


  // useEffect(()=>{
    
  
  //   console.log(arr)
   
  // })


  useEffect(()=>{
    let full=[...expression]
    if(comparator.length>0){
      
      full=[...full,comparator]
    }
    if(rhs.length>0){
      full=[...full,rhs]
    }

    setArr([...full])
  },[expression,comparator,rhs])




  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
      
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log(data)
    if(data.length>2){
      return setArr([...arr])
    }

    if(compare.includes(data)){
      setComp(data)
    }
    else{
      setExpress([...expression,data])
    }
    

  
  }

  function removeIt(e){
      console.log(e.target.id)
      if(compare.includes(arr[e.target.id])){
        setComp("")
      }
      if(!isNaN(arr[e.target.id])){
        setRhs("")
      }
      let temp=expression;
      if (e.target.id > -1) {
            temp.splice(e.target.id, 1); 
          }
     
      setExpress([...temp])
  }

  function addCompare(e){
    setComp(e.target.id)
  }

  function addRhs(){
    const input = prompt('What should be the rhs')
    setRhs(input)
  }


  async function evaluate(){
  
    try{
      const res= await axios.post("http://localhost:5000/evaluate",{
          expression:expression,
          comparator:comparator,
          rhs:rhs

      })

      alert(res.data);

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">

      <div className='alphabets'>
        {alpha.map(s=>{
          return <Alphabet drag={drag} symbol={s}/>
        })}
        
        
      </div>


      <div className="operators" >

        {operators.map(s=>{
          return <Operator symbol={s} drag={drag}/>
        })}


          <div className='compare' style={{display:"flex" , margin:"0px 50px 0px 50px"}}>
            <div className='op' id="<" onDoubleClick={addCompare} > {"<"}
            </div>
            <div className='op' id=">" onDoubleClick={addCompare}> {">"}
            </div>
          </div>

          <div className='op' id="rhs" onDoubleClick={addRhs}> RHS Integer
          </div>
    
                    
         
      </div>

      <div className="canvas" onDrop={drop} onDragOver={allowDrop}>

        { 
          arr.map((k,index)=> alpha.includes(k) ? 
          <Alphabet symbol={k} remove={true} removeIt={removeIt} name={index}/>:
          <Operator symbol={k} remove={true} removeIt={removeIt} name={index}/>
    
    )}

      </div>

    <div className='btnd'>
      <button  onClick={evaluate} style={{cursor:"pointer"}}>Evaluate</button>
    </div>          
    </div>
  );
}

export default App;



