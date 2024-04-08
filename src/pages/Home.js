import React, { useEffect, useState } from "react";
import FlatsTable from "../components/FlatsTable";
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import checkUserLogged from "../services/actions";
import WelcomeImage from '../images/welcome.png';
import Footer from '../components/Footer'; // Import Footer component

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  paddingTop: '80px', // Added top padding
};

const contentStyle = {
  flex: 1,
  padding: '20px',
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  color: '#333',
  textAlign: 'center', // Center the text
};

const bodyTextStyle = {
  marginBottom: '20px',
  fontSize: '1.1rem',
  lineHeight: '1.6',
  color: '#555',
};

const skeletonStyle = {
  borderRadius: '10px',
  animation: 'pulse 1.5s infinite',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  maxWidth: '60%',
  height: 'auto',
  borderRadius: '10px',
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      checkUserLogged();
    };

    fetchData();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom style={headingStyle}>
            Welcome to FlatFinder
          </Typography>
          <Typography variant="body1" style={bodyTextStyle}>
            Discover the perfect abode with FlatFinder, where elegance meets innovation. Our commitment is to redefine apartment hunting, transforming it into an exhilarating journey of self-discovery.
          </Typography>
        </div>

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <img src={WelcomeImage} alt="Welcome" style={imageStyle} />
        </div>

        <Typography variant="h4" component="h2" gutterBottom style={headingStyle}>
          All Flats
        </Typography>

        <div>
          {isLoading ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton variant="rectangular" width={'100%'} height={200} style={{ ...skeletonStyle, animationDuration: '1.5s', animationDelay: `${index * 0.2}s` }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <FlatsTable type={'all-flats'} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
