import { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';

function Register() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newActiveTab) => {
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
    <div className="Register">
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleChangeTab} aria-label="simple tabs example">
          <Tab label="Simple Paragraph" />
          <Tab label="BorjaScript Logo" />
          <Tab label="Latest Videos Table" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0}>
        <div className="container">
          <br />
          <p>This is a simple paragraph</p>
        </div>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <div className="container">
          <br />
          {/* Content for the second tab goes here */}
        </div>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <div className="container">
          <br />
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Upload Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>How to Fix the pickAlgorithm Error in React || Fix Cannot read property 'pickAlgorithm' of null</td>
                <td>04/21/2022</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Simple Autocomplete in React JS || React Hooks || Tutorial in Spanish</td>
                <td>04/27/2022</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Autocomplete with Web Api in React JS || Rest Api || Tutorial in Spanish</td>
                <td>05/05/2022</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
    </div>
  );
}

export default Register;
