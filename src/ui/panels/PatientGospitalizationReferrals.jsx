import React from 'react'
import { useData } from '../../dataProviders/DataProvider.jsx';
import ContentLabel from '../elements/components/ContentLabel.jsx';
import useRealtimeData from '../../dataProviders/useRealtimeData.js';
import GospitalizationReferralTable from '../elements/tables/GospitalizationReferralTable.jsx';

function PatientGospitalizationReferrals() {
    const { data, setData } = useData();
    const patientData = useRealtimeData('get_patients').data;

    if (!patientData) return null;
    // console.log(patientData)
    const patient = patientData.filter(patient => patient.user_id === data.userData.id)[0];

    // console.log(patient)

    return (
      <div className='content_panel'>
        <ContentLabel title="Моя направления на госпитализацию" />
        <GospitalizationReferralTable patientId={patient.patient_id} />
      </div>
    )
}

export default PatientGospitalizationReferrals