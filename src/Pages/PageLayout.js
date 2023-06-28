import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';



const PageLayout = () => (
  <div style={{display:'flex', flexDirection:'row'}} className='pageLayout'>
     <Header/>
     
    <SideBar/>
 
    <div  className='outlet'>
    <Outlet />
    </div>

   
  </div>
);
export default PageLayout;