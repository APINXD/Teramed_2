import React, { useEffect, useState } from 'react'
import ContentLabel from '../elements/components/ContentLabel.jsx'
import { useData } from '../../dataProviders/DataProvider.jsx';
import PatientAppointmentReferralsTable from '../elements/tables/PatientAppointmentReferralTable.jsx';
import useRealtimeData from '../../dataProviders/useRealtimeData.js';

function PatientAppointmentReferralsViewPanel() {
  const { data, setData } = useData();
  const patientData = useRealtimeData('get_patients').data;

  if (!patientData) return null;
  const patient = patientData?.filter(patient => patient.user_id === data.userData.id)[0];

  return (
    <div>
      <ContentLabel title="Мои направления на прием" />
      
      <PatientAppointmentReferralsTable patientData={patient}/>
    </div>
  )
}

export default PatientAppointmentReferralsViewPanel





