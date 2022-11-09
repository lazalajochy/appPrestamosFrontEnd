import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const url = process.env.REACT_APP_API;
const Login = () => {
    const [managerEmail, setManagerEmail] = useState('');
    const [managerPassword, setManagerPassword] = useState('')
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            let a = await axios.post(`${url}/login`, { managerEmail: managerEmail, managerPassword: managerPassword });
            let manager_id = a.data
            navigate(`/dashboard/${manager_id}`);

        } catch (error) {
            console.log(error);
        }
    }

    const handleEmail = e => {
        setManagerEmail(e.target.value)
    }

    const register = () => {

        navigate('/register')
    }
    return (
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={Auth}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Inicia sesión</h3>
                    <div className='text-center'>
                        Todavía no  estás registrado?{" "}
                        <span className='link-primary' onClick={register}>
                            Registrarse
                        </span>
                    </div>
                    <div className='form-group mt-3'>
                        <label>Correo electrónico</label>
                        <input
                            onChange={handleEmail}
                            value={managerEmail}
                            type='email'
                            className='form-control mt-1'
                            placeholder='e.jane@gmail.com'
                            required
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <label>Contraseña</label>
                        <input
                            value={managerPassword}
                            onChange={(e) => setManagerPassword(e.target.value)}
                            required
                            type='password'
                            placeholder='**********'
                            className='form-control mt-1'
                        />
                    </div>
                    <div className='d-grip-gap-2 mt-3'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;