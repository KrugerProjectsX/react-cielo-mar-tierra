import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  PRIMARY_COLOR,
  LINK_COLOR,
  ACCENT_COLOR,
} from '../components/Colors';

const Home = () => {
  return (
    <div>
  
      <Container maxWidth="xl" className="mx-auto mt-10">
        <Typography variant="h3" sx={{ color: PRIMARY_COLOR, textAlign: 'center', mb: 4 }}>
          Welcome to FlatFinder
        </Typography>
        <Typography variant="body1" sx={{ color: LINK_COLOR, textAlign: 'center', mb: 4 }}>
          Discover your perfect home with FlatFinder. We provide a wide range of listings to
          suit your preferences. Whether you are looking for a cozy apartment or a spacious
          house, FlatFinder has you covered.
        </Typography>
        <div className="flex justify-center">
          <Button
            variant="contained"
            component={Link}
            to="/all-flats"
            sx={{ backgroundColor: ACCENT_COLOR, color: LINK_COLOR }}
          >
            Explore Listings
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
