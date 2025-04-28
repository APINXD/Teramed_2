import React, { useState, useEffect } from 'react'
import { useData } from '../../dataProviders/DataProvider.jsx';
import { SideMenu } from '../elements/SideMenu.jsx';
import { MenuButton } from '../elements/components/MenuButton.jsx';
import DoctorsContentPanel from '../panels/admin/DoctorsContentPanel.jsx';
import GospitalizationsContentPanel from '../panels/GospitalizationsContentPanel.jsx';
import PatientsContentPanel from '../panels/PatientsContentPanel.jsx';
import PatientMedCardPanel from '../panels/PatientMedCardPanel.jsx';
import UsersContentPanel from '../panels/admin/UsersContentPanel.jsx';
import PatientAppointmentViewPanel from '../panels/patient/PatientAppointmentViewPanel.jsx';
import './styles.css';
import { fetchAccessiblePanelsForRole, getDoctors } from '../../api/supabaseApi.js';
import DoctorsAppointmentsPanel from '../panels/DoctorsAppointmentsPanel.jsx';
import PatientAppointmentReferralsViewPanel from '../panels/PatientAppointmentReferralsViewPanel.jsx';
import GospitalizationReferralsPanel from '../panels/GospitalizationReferralsPanel.jsx';
import PatientGospitalizationReferrals from '../panels/PatientGospitalizationReferrals.jsx';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../actions/authActions';
// import { Axios } from 'axios';
// import jwt from 'jsonwebtoken';

const components = [
  { 'DoctorsContentPanel': { component: <DoctorsContentPanel />, title: "Сотрудники" } },
  { 'GospitalizationsContentPanel': { component: <GospitalizationsContentPanel />, title: "Госпитализация" } },
  { 'GospitalizationReferralsPanel': { component: <GospitalizationReferralsPanel />, title: "Направления на госпитализацию" } },
  { 'PatientsContentPanel': { component: <PatientsContentPanel />, title: "Пациенты" } },
  { 'PatientMedCardPanel': { component: <PatientMedCardPanel />, title: "Моя мед карта" } },
  { 'UsersContentPanel': { component: <UsersContentPanel />, title: "Пользователи" } },
  { 'PatientGospitalizationReferrals': { component: <PatientGospitalizationReferrals />, title: "Мои направления на госпитализацию" } },
  { 'PatientAppointmentViewPanel': { component: <PatientAppointmentViewPanel />, title: "Мои назначенные приемы" } },
  { 'DoctorsAppointmentsPanel': { component: <DoctorsAppointmentsPanel />, title: "Назначенные приемы" } },
  { 'PatientAppointmentReferralsViewPanel': { component: <PatientAppointmentReferralsViewPanel />, title: "Мои направления на прием" } },
];
const doctorsData = getDoctors();
export default function UserPage() {
  // const doctorsData = getDoctors();
  // const secret = 'fgh521fgh52fgh5fg';
  // const jwt = require('jsonwebtoken');
  console.log(doctorsData)
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  const { data, setData } = useData();
  var roleId = data.userData.role;

  const [activePanel, setActivePanel] = useState(null);
  const [accessiblePanels, setAccessiblePanels] = useState([]);

  const handlePanelChange = (panelName) => {
    setActivePanel(panelName);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuth(true);
      dispatch(setAuthToken(token));
      // Axios.headers.common.Authorization
      // Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const fetchData = async () => {
      try {
        const panels = (await fetchAccessiblePanelsForRole(roleId)).data;
        setAccessiblePanels(panels || []);
      } catch (error) {
        console.error('Ошибка при получении доступных панелей:', error);
      }
    };
    fetchData();
  }, [])


  return (
    <div>
      <div className='user_page_back_frame'>
        <SideMenu>
          {accessiblePanels.map((panelName, index) => {
            const componentData = components.find((item) => Object.keys(item)[0] === panelName.panel_name);
            if (componentData) {
              const { component, title } = componentData[panelName.panel_name];
              return (
                <MenuButton key={index} title={title} onClick={() => handlePanelChange(panelName.panel_name)} />
              );
            }
            return null;
          })}
        </SideMenu>
        <div className='user_page_content_frame'>
          {activePanel && components.map(item => {
            const panelName = Object.keys(item)[0];
            if (panelName === activePanel) {
              return item[activePanel].component;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  )
}


