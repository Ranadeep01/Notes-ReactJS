import React, { useState } from 'react'
import './Home.css';

export default function Options(props) {

  const [clr, setclr] = useState()



  const clrCng=()=>{
    const newColor = prompt('Enter color name');
    
    setclr(newColor);
    props.func(newColor)
    console.log(newColor)
  };


  const [fnt, setfnt] = useState(false)
  const fontCng=()=>{
  }

  return (
    <div>
      <div className='options'>
        <div className="home-description-options">
            <button className='opt-btn' onClick={clrCng} >Change Color</button>
            <button className='opt-btn' onClick={fontCng} >Change Font</button>
            <button className='opt-btn'>Change Alignment</button>
            <button className='opt-btn'>Change Point Style</button>

            </div> 
        </div>
        
    </div>
  )
}
