import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchemas';
import Button from '../components/UI/Button/Button';

import { useSettingsStore } from '../store/useSettingsStore';

const StartPage = () => {
    const navigate = useNavigate();

    const { settings, setSettings } = useSettingsStore();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(settingsSchema),
        defaultValues: settings,
    });

    useEffect(() => {
        reset(settings);
    }, [settings, reset]);

    const onSubmit = (data) => {
        setSettings(data);
        navigate(`/game/${data.difficulty}/${data.playerName}`);
    };

    return (
        <div>
            <h1>Налаштування гри Судоку</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Ім'я:</label>
                    <input {...register('playerName')} />
                    {errors.playerName && <p style={{color: 'red'}}>{errors.playerName.message}</p>}
                </div>
                <div>
                    <label>Складність:</label>
                    <select {...register('difficulty')}>
                        <option value="easy">Легка</option>
                        <option value="medium">Середня</option>
                        <option value="hard">Складна</option>
                    </select>
                </div>

                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <Button type="submit">Почати гру</Button>
                    <Button type="button" onClick={() => navigate('/results')} variant="secondary">
                        Таблиця рекордів
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default StartPage;