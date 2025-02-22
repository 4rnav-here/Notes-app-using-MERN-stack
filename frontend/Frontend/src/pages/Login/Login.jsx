import React from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <>
    <div><Navbar /></div>
    <div>
      <div>
        <form onSubmit={() => {}}>
          <h2 className='text-2xl mb-7'>Login</h2>

          <input type="text" placeholder='Email' className='input-box' />
          <button type="submit" className='btn-primary'>Login</button>

          <p className='text-sm text-center mt-4'>Not registered yet  
            <Link to="/signup" className='text-blue-500'> Create an account</Link>
          </p>
        </form>
      </div>
  
    </div>
    </>
  )
}

export default Login;