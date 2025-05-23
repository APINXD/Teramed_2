import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../../../api/supabaseClient.js';


const AddGospitalizationForm = ({ onRequestClose, patientId, terapevtId }) => {
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    
    const statusId = '4ef444f9-d7c3-4a6d-9c56-22585d16189e';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(patientId)
            const { error } = await supabase.from('gospitalization_referrals').insert({
                id_patient: patientId,
                id_status: statusId,
                id_terapevt: terapevtId,
                reason: reason,
                start_date: startDate,
                // end_date: endDate,
                creation_date: new Date().toISOString(), // Текущая дата и время
            });

            if (error) {
                throw new Error(error.message);
            }

            onRequestClose();
        } catch (error) {
            console.error('Error creating referral:', error.message);
        }
    };

    return (
        <div>
            {/* <h2>Форма для госпитализации</h2> */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Причина:</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Дата начала:</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                {/* <div>
                    <label>Дата Окончания:</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div> */}
                <button type="submit">Создать направление на госпитализацию</button>
            </form>
        </div>
    );
};

AddGospitalizationForm.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    patientId: PropTypes.string.isRequired,
    terapevtId: PropTypes.string.isRequired,
};

export default AddGospitalizationForm;

