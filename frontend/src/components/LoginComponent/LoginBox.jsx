import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const LoginBox = () => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('data_token');
    if (token) {
      navigate('/dashboard');
    }else{
      navigate('/')
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {  
      const response = await axios.post('http://localhost:5000/login',{email,password}, { withCredentials: true })
      localStorage.setItem('data_token', response.data.token);
      const userId = response.data.user._id;
      localStorage.setItem('userId', userId);
      toast.success(response.data.message)
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.')
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  }

  return (
    <div className='Container-Login'>
      <div className='LoginBox'>
        <p>Login to get started</p>
        <div className='ComponentForLogin'>
            <p className='LabelForLogin'>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} className='LoginInputs' type="email" value={email}/>
        </div>
        <div className='ComponentForLogin'>
            <p className='LabelForLogin'>Password</p>
            <input  onChange={(e)=>setPassword(e.target.value)} className='LoginInputs' type="password" value={password}/>
        </div>
        <p style={{textAlign:'end',paddingRight:20,color:'blue',fontSize:14,cursor:'pointer'}}>Forget password?</p>
        <div>
            <button onClick={handleLogin} className='LoginButton'>Login</button>
        </div>
        {errorMessage && <p style={{color:'red',fontSize:16}}>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default LoginBox
