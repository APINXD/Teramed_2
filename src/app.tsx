import React from 'react';
import AuthorizationPage from './ui/pages/AuthorizationPage.jsx';
import { DataProvider } from './dataProviders/DataProvider.jsx';
import { GlobalSpace } from './dataProviders/GlobalSpace.jsx';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import UserPage from './ui/pages/UserPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
          <div className="App">
          <header className="App-header">
          <DataProvider>
            <GlobalSpace/>
          </DataProvider>  
            <Routes>
              <Route path='/teramed/' element={<AuthorizationPage/>}></Route>
              <Route path='/teramed/Authorization' element={<AuthorizationPage/>}></Route>
              <Route path='/teramed/UserPage' element={<UserPage/>}></Route>
            </Routes>
              
            {/* <DataProvider>
              <GlobalSpace/>
            </DataProvider> */}
          </header>
        </div>
        </BrowserRouter>
  );
};

export default App;