import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
         <Typography variant="h3" gutterBottom style={{ color: '#333', fontWeight: 600 }}>
            Uh-oh, something went wrong!
         </Typography>
         <Typography variant="subtitle1" gutterBottom style={{ color: '#888' }}>
            It seems like we're having some server issues. Don't worry, our team is already on it!
         </Typography>
         <Button variant="contained" color="primary" component={Link} to="/">
            Try again
         </Button>
      </div>
   );
};

export default ErrorPage;