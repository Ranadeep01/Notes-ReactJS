import React, { useEffect, useState } from 'react'
import './Home.css';
import Options from './Options';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function Home(props) {

  
  //state variablles
    const [idx, setidx] = useState(1)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [file, setfile] = useState(null)
    const [color, setcolor] = useState('')
    const [show, setshow] = useState(false)
    const [desccolor, setdesccolor] = useState('')
    const [descfont, setdescfont] = useState('')
    const [desctextcolor, setdesctextcolor] = useState('')
    const [search, setsearch] = useState('')
    const [Type, setType] = useState('')

    //Array for storing notes
    const [arr, setarr] = useState([])

    //Object template for a new note
    const v=({idx:0, title:'', description:'', file:null, color:'', show:false, desccolor:'', descfnt:'', desctextcolor:'', Type:''});

    //Function to save a new note
    const saveNote=()=>{
      v.idx=idx
      v.title=title
      v.description=description
      v.file=file
      v.color=color
      v.desccolor=desccolor
      v.desctextcolor=desctextcolor
      v.descfont=descfont
      v.Type=tmp

      

      setarr([...arr, v])
      setidx(idx+1)
      settitle('')
      setdescription('')
      setfile('')             // Set file to null after saving to prevent reuse of the same file
      setcolor('')
      setdesccolor(desccolor)
      setdesctextcolor('')
      setshow(false)
      setdescfont('')

      setType('')

      newadd('Add') 
    }

    // State for toggling 'Add' and 'Del' buttons
    const [add, newadd] = useState('Add')

    // Function to toggle 'Add' and 'Del'
    const Add=()=>{
      if(add==='Add'){
        newadd('Del') 
      }
      else{
        newadd('Add')
      }
    }
    
    // Function to show/hide description
    const showDescription=(curr)=>{
      const a = [...arr]
      if(curr.show===true){
        a[curr.idx-1]={...a[curr.idx-1], show:false}
      }
      else{
        a[curr.idx-1]={...a[curr.idx-1], show:true}
      }
      setarr(a)
    }

    // Function to change color of description
    const clrCng=(curr)=>{                          
      const newColor = prompt('Enter color name');
      if(newColor!=='' && newColor!==null){
      const a = [...arr]
      a[curr.idx-1]={...a[curr.idx-1], desccolor:newColor}
      setarr(a)
      }
    }
    
    // Function to change font of description
    const fntCng=(curr)=>{                          
      const newFnt = prompt('Enter text style');
      if(newFnt!=='' && newFnt!==null){
      const a = [...arr]
      a[curr.idx-1]={...a[curr.idx-1], descfnt:newFnt}
      setarr(a)
      }
    }

    // Function to sort the notes according to the index
    const  Sort=()=>{   //function to sort the notes according to the index
      let temp=[...arr].reverse();
      setarr([...temp])
    }

    // Function to change text color of description
    const textColorCng=(curr)=>{      //function to change text color of description
      const newtextColor = prompt('Enter color name');
      if(newtextColor!=='' && newtextColor!==null){
      const a = [...arr]
      a[curr.idx-1]={...a[curr.idx-1], desctextcolor:newtextColor}
      setarr(a)
      }
    }

    // Function to handle file input
    const [tmp, settmp] = useState('')
    const fileInput=(e)=>{
      setfile(URL.createObjectURL(e.target.files[0]))    
      settmp(e.target.files[0].type)
      


    }

    return (
      <div>
        <div className="home-top">
            <button className="home-sort-btn" onClick={Sort} >Sort</button>
            <div className='search'>
                <input type="text" placeholder='ENTER NOTE NAME TO SEARACH' value={search} className="home-search" onChange={(e)=>{setsearch(e.target.value)}}/>
            </div>
        </div>
      
        <div>  
          {arr.filter((item)=>{
            if(search.toLowerCase()===''){
              return item;
            }
            else{
              if(item.title.toLowerCase().includes(search.toLowerCase())){
                return item;
              }
              else{
                return null
              }
            }
            return search.toLowerCase() ===''? item : item.title.toLowerCase()===(search.toLowerCase());
            }).map((curr, idx)=>{
              {console.log('arr', arr)}
              return(
                <div>
                  <li className='home-li' style={{backgroundColor:curr.color}} onClick={()=>showDescription(curr)}>{curr.title}</li>
                  <div className='description'>
                    {curr.show!==true?
                      <div className="home-description-options" style={{color:'black', backgroundColor:curr.desccolor, fontFamily:curr.descfnt, color:curr.desctextcolor}}> {/* Display options in description */}
                      
                        <div className='options'>
                          <button className='opt-btn' onClick={()=>clrCng(curr)}>Change Color</button>
                          <button className='opt-btn'onClick={()=>fntCng(curr)}>Change Font</button>
                          <button className='opt-btn' onClick={()=>textColorCng(curr)}>Change Text Color</button>
                        </div>
                        {(curr.Type).includes('image')?
                        <img className='image'
                          src={curr.file}  // Replace with the actual URL of your image
                        />
                        :
                        <iframe title='video' className='image'
                        src={curr.file
                        } frameborder='0' allowfullscreen></iframe>
                      }
                        
                        <p>{curr.description}</p>   
                      </div>
                    :null}
                  </div>


              
            </div>
            )
          })}
        </div>
        <button className="home-add" onClick={Add}>{add}</button>
        {add==='Del' ?
          <div className="add-column">
              <input type='text' className='inputField' value={title} onChange={(e)=>settitle(e.target.value)} placeholder='Title' required />
              <textarea rows="4" cols="50" placeholder='Enter Description' className='inputField' value={description} onChange={(e)=>{setdescription(e.target.value)}} required/>
              <input type='file' accept="image/*,video/*" id='file-id' className='inputField' onChange={fileInput} required/>
              <span>
                  <input className='inputField' type='text' placeholder='Choose Note Color' value={color} onChange={(e)=>{setcolor(e.target.value)}} />
                  <button className="home-content-save-btn" onClick={saveNote}>save note</button>    
              </span>
          </div>
        :null
        }
        {console.log('Type', Type)}
      </div>    
  )
}
