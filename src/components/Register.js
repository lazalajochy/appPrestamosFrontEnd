import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_API;

const Register = () => {
    let [managerName, setManagerName] = useState(''), [managerEmail, setManagerEmail] = useState(''), [managerPassword, setManagerPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState(''), [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault()
        await axios.post(url, {managerName: managerName, managerEmail:managerEmail, managerPassword: managerPassword, confirmPassword: confirmPassword, companyName: companyName})
        navigate('/')
    };

    const login = async(e) => {
        navigate('/')
    };

    return (
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={register}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Registrarse</h3>
                    <div className='text-center'>
                        ¿Ya registrado?{" "}
                        <span className='link-primary' onClick={login}>
                            Inicia sesión
                        </span>
                    </div>

                    <div className='form-group mt-3'>
                        <label>Nombre Completo</label>
                        <input
                            value={managerName}
                            onChange={(e) => setManagerName(e.target.value)}
                            required
                            className='form-control mt-1'
                            placeholder='e.g Jane Doe'
                        />
                    </div>

                    <div className='form-group mt-3'>
                        <label>Correo electrónico</label>
                        <input
                            value={managerEmail}
                            onChange={(e) => setManagerEmail(e.target.value)}
                            className='form-control mt-1'
                            type='email'
                            required
                            placeholder='e.jane@gmail.com'
                        />
                    </div>

                    <div className='form-group mt-3'>
                        <label>Empresa</label>
                        <input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        placeholder='ASP Afiliados'
                        type="text"
                        className='form-control mt-1'
                        />

                    </div>
                    <div className='form-group mt-3'>
                        <label>Contraseña</label>
                        <input 
                            value={managerPassword}
                            onChange={(e) => setManagerPassword(e.target.value)}
                            required
                            placeholder='**********'
                            className='form-control mt-1'
                            type="password" />
                    </div>
                    <div className='form-group mt-3'>
                        <label>Confirmar contraseña</label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='**********'
                            type='password'
                            className='form-control mt-1'
                        />
                    </div>
                    <div className='d-grip-gap-2 mt-3'>
                        <button type='submit' className='btn btn-primary' >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Register;