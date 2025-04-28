import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentLabel from '../elements/components/ContentLabel.jsx';
import GospitalizationReferralTable from '../elements/tables/GospitalizationReferralTable.jsx';
import './styles.css';
import GospitalizationTable from '../elements/tables/GospitalizationTable.jsx';
import { useData } from '../../dataProviders/DataProvider.jsx';

export default function GospitalizationContentPanel() {
    const { data, setData } = useData();

    return (
        <div className='content_panel'>
            <ContentLabel title="Госпитализация" />
            <GospitalizationTable patientId={null}/>
        </div>
    )
}
