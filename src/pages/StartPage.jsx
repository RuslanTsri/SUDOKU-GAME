import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchemas';
import Button from '../components/UI/Button/Button';
import { useGameSettings } from '../hooks/useGameSettings';

const StartPage = () => {
    const navigate = useNavigate();
    const { settings, updateSettings } = useGameSettings();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(settingsSchema),
        defaultValues: settings || { difficulty: 'easy', playerName: '' },
    });

    useEffect(() => {
        if (settings) {
            reset(settings);
        }
    }, [settings, reset]);

    const onSubmit = (data) => {
        updateSettings(data);
        navigate(`/game/${data.difficulty}/${data.playerName}`);
    };

    return (
        <div>
            <h1>Налаштування гри Судоку</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="playerName">Ім'я гравця:</label>
                    <input id="playerName" {...register('playerName')} />
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

                <Button type="submit">Почати гру</Button>
            </form>
        </div>
    );
};

export default StartPage;