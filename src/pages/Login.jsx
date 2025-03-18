import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthContext from '../context/AuthContext';

import { API_URL } from '../config/config';

export default function Login () {
    const { login } = useContext(AuthContext)
    const { t } = useTranslation();

    const schema = yup.object().shape({
        username: yup.string().required(t('usernameRequired')),
        password: yup.string()
            .min(8, t('passwordMinLength'))
            .required(t('passwordRequired')),
    });

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, data);
            //localStorage.setItem("token", response.data.token);
            login(response.data.token);
            alert(t('loginSuccess'));
            navigate("/profile");
        } catch {
            alert(t('wrongLogin'));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4">{t('loginTitle')}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label>{t('username')}</label>
                        <input type="text" {...register("username")} className="w-full p-2 border rounded" />
                        <p className="text-red-500">{errors.username?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label>{t('password')}</label>
                        <input type="password" {...register("password")} className="w-full p-2 border rounded" />
                        <p className="text-red-500">{errors.password?.message}</p>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        {t('loginButton')}
                    </button>
                </form>
            </div>
        </div>
    );
};
