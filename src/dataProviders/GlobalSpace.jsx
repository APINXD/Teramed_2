import { createContext } from 'react';
import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import {AuthorizationPage} from '../ui/pages/AuthorizationPage.jsx';

import { useData } from './DataProvider.jsx';
import UserPage from '../ui/pages/UserPage.jsx';

const DataContext = createContext();

function GlobalSpace() { 
    const { data, setData } = useData();
    const navigate = useNavigate();
    
    // const {isLoading, setLoading} = useState();

    return (
        <div>
            {data.isLogin === false && <AuthorizationPage/>}
            {data.isLogin === true && <UserPage/>}
            {data.isLogin === true && navigate('/UserPage')}
        </div>
    )    
}

export {GlobalSpace}
