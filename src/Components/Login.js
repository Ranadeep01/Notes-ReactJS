import React, { useState } from 'react'
import './Login.css'
import Home from './Home'
import { useNavigate } from 'react-router-dom';  //useNavigate is a hook to traverse form one page to another
import { useEffect } from 'react';
import axios from 'axios';


export default function Login(props) {

  const [values, setvalues] = useState({
    email:'',
    password:''
  })

  console.log(values)





  const [match, setmatch] = useState(false)



  // State for email input
  const [email, setemail]=useState('')
  const emailfunc=(e)=>{
    setemail(e.target.value)
    setvalues({...values, [e.target.name]:[e.target.value]})
  }
  
  // State for password input
  const [password, setpassword]=useState('')

  // Function to handle email input change
  const passwordfunc=(e)=>{
    setpassword(e.target.value)
    setvalues({...values, [e.target.name]:[e.target.value]})
  }
  
  // State for button state ('unclicked' or 'clicked')
  const [home, sethome] = useState('unclicked')

  // Function to update button state to 'clicked'
  const clicked=()=>{
    if (home==='unclicked') {
      sethome('clicked')
    }
  }
  
  // Hook to navigate between pages
  const navigate = useNavigate(); //creating a variable named history using usehistory hook
  
  // State for button name ('LogIn' or 'SignUp')
  const [btnName, setbtnName] = useState('LogIn')

  // Function to toggle between 'LogIn' and 'SignUp' buttons
  const btnChange=()=>{
    if(btnName==='LogIn'){
      setbtnName('SignUp');
      settxt('Already a member?')
    }
    else{
      setbtnName('LogIn')
      settxt("Don't have an account?")
    }
    toggle==='LogIn'?settoggle('SignUp'):settoggle('LogIn')

    // Setting email and password empty when toggling the login and signup
    setemail('')
    setpassword('')
  }

  // Function to change the page when the button is clicked
  const changePage=(e)=>{
    console.log('changePage funcition ')
    setvalues({...values, [e.target.name]:[e.target.value]})
    if((match===true || btnName==='LogIn')){

      //match credintials with database

      navigate('/home');
    }
    else{
      if(btnName==='SignUp' && password===authpassword){

        //insert cressicntials into data base

        navigate('/home');
      }
    }
  }

  // State for toggle ('SignUp' or 'LogIn')
  const [toggle, settoggle] = useState('SignUp')

  // State for text to display based on toggle
  const [txt, settxt] = useState("Don't have an account?")
  
  const [authpassword, setauthpassword] = useState('')
  const matchPassword=(e)=>{
    setauthpassword(e.target.value)
    if(authpassword!==password){
      console.log('password doesnt match')
    }
    else{
      console.log('password match')
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8081/notes', {values})
    .then(res=>console.log('Register successfull!!'))
    .catch(err=>console.log(err))
  }

  return (
    <div>
        <div className="container">
            <h1>{btnName}</h1>    
            <form onSubmit={handleSubmit}>
            <div>
                <input className='login-input' type="text" value={email.toLowerCase()} name="email" placeholder='Email' onChange={emailfunc} id="email"/><br/>
                <input className='login-input' type="password" value={password} name="password" placeholder='Password' onChange={passwordfunc} id="password"/><br/>

                {/* Conditional rendering based on button state */}
                { btnName==='SignUp'? <div> 
                  <input type="password" className='login-input' value={authpassword} onChange={matchPassword} placeholder='Confirm Password'  id="password"/><br/> </div>:<div></div> }

                  <button className='login-btn' onClick={changePage}>{btnName}</button><br/>

              
            </div>
              </form>
                <p>{txt} <a className='sign-up' onClick={btnChange}>{toggle}
                    </a></p>
              <div>
              </div>
              {email}
              {password}
        </div>
    </div>
  
  )
}
