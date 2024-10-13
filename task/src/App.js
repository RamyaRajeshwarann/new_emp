import './App.css';
import Dashboard from './Components/EmployeesDatas/index'
import Addemployeeform from './Components/AddEmployeeForm/Addemployeeform'; 
import Alert from '../src/Components/AlertMessage/AlertMsg'
import SideBar from '../src/Components/Sidebar/SideBar';
import {store} from '../src/Store/Store'
import {Provider} from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <SideBar/>
      <Dashboard/>
      <Addemployeeform/>
      <Alert/>
    </Provider>
  
  )
}

export default App;
