import { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';

function Ingreso() {
  const [activeTab, setActiveTab] = useState(0);

  const cambiarTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <div className="Ingreso">
      <AppBar position="static">
        <Tabs value={activeTab} onChange={cambiarTab} aria-label="simple tabs example">
          <Tab label="Parrafo Sencillo" />
          <Tab label="Logo BorjaScript" />
          <Tab label="Tabla Últimos Vídeos" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0}>
        <div className="container">
          <br />
          <p>Este es un párrafo sencillo</p>
        </div>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <div className="container">
          <br />
          {/* Aquí va el contenido para el segundo tab */}
        </div>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <div className="container">
          <br />
          <table className="table table-bordered table-sm">
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
      </TabPanel>
    </div>
  );
}

export default Ingreso;
