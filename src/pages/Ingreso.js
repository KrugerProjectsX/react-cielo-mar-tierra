import 'bootstrap/dist/css/bootstrap.min.css';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import { useState } from 'react';

function Ingreso() {

  const[activeTab,setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) =>{
    if(activeTab !== numeroTab){
      setActiveTab(numeroTab);
    }
  }

  return (
    <div className="Ingreso">
       <Nav tabs>
         <NavItem>
           <NavLink 
           className={(activeTab==="1" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("1")}>
             Parrafo Sencillo
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab==="2" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("2")}>
             Logo BorjaScript
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab==="3" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("3")}>
            Tabla Últimos Vídeos
           </NavLink>
         </NavItem>

       </Nav>

       <TabContent activeTab={activeTab}>
         <TabPane tabId="1">
           <div className='container'>
             <br />
             <p>Este es un párrafo sencillo</p>
           </div>

         </TabPane>

         <TabPane tabId="2">
           <div className='container'>
             <br />
           
           </div>

         </TabPane>


         <TabPane tabId="3">
           <div className='container'>
             <br />
             <table className='table table-bordered table-sm'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Fecha de Subida</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Cómo Solucionar el Error pickAlgorithm en React || Fix Cannot read property 'pickAlgorithm' of null</td>
                    <td>21/04/2022</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Autocomplete Sencillo en React JS || React Hooks || Tutorial en Español</td>
                    <td>27/04/2022</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Autocomplete con Web Api en React JS || Api Rest || Tutorial en Español</td>
                    <td>05/05/2022</td>
                  </tr>
                </tbody>
              </table>
           </div>

         </TabPane>

       </TabContent>
    </div>
  );
}

export default Ingreso;