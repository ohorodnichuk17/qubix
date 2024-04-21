import React from 'react';
import Typography from '@mui/material/Typography';
import LOGOTYPE from '../../assets/logotype.png';

const Logo = () => (
   <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, position: 'absolute', top: 0, left: 3 }}>
      <img src={LOGOTYPE} alt="Quilt Logo" style={{ width: 50, height: 50, marginRight: 10 }} />
      <Typography variant="h4" sx={{ fontFamily: 'Lilita One', fontWeight: 'bold', color: '#FF7F50' }}>
         Quilt
      </Typography>
   </div>
);

export default Logo;