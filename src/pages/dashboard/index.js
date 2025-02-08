import React from 'react';
// material-ui
import {
  Grid,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={2.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={7} lg={8} sx={{ mt: 1.0, p: 0 }}>
        <MainCard contentSX={{ p: 2, pt: 0, pl: 0, pb: 0, textAlign: 'center' }} sx={{ pt: 1.5, pl: 2, pb: 0, border: 'none' }}>
          <Grid container spacing={2}>
            <Grid item xs={2} lg={2}>
             
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

    </Grid>
  );
}
