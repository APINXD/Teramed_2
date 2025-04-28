import './App.css';
import AuthorizationPage from './ui/pages/AuthorizationPage';
import { DataProvider } from './dataProviders/DataProvider';
import { GlobalSpace } from './dataProviders/GlobalSpace';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import UserPage from './ui/pages/UserPage';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      <header className="App-header">
      <DataProvider>
        <GlobalSpace/>
      </DataProvider>  
        <Routes>
          <Route path='/teramed/' element={AuthorizationPage}></Route>
          <Route path='/teramed/Authorization' element={AuthorizationPage}></Route>
          <Route path='/teramed/UserPage' element={UserPage}></Route>
        </Routes>
          
        {/* <DataProvider>
          <GlobalSpace/>
        </DataProvider> */}
      </header>
    </div>
    </BrowserRouter>
    
  );
}

export default App;


