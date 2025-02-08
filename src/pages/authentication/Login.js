import React, { useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

export const Login = () => {

  return (
    <AuthWrapper>
      <Grid spacing={3} columns={12} xs={12} sm={12} md={12} lg={12}>
        <div className="login-right">
          <Grid>
            <img />
          </Grid>
          <Grid
            sx={{
              mt: 4
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                color: '#454F5B',
                fontSize: {
                  lg: '20px',
                  md: '20px',
                  sm: '20px'
                },
                margin: 'auto',
                textAlign: 'center',
                fontFamily: 'Open Sans'
              }}
            >
              <h3 style={{ fontWeight: 700 }}>Welcome to MS Academy</h3>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mt: 3 }}>
              {/* {view ? ( */}
                <Grid>
                  <div className="loginlable">
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>Login</Typography>
                  </div>
                </Grid>
              {/* ):(
                <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <div className="loginlable" style={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>Forgot Password</Typography>
                  </div>
                </Grid>
              </Grid>
              )} */}
              
            </Stack>
          </Grid>
          <Grid item sx={{ pl: 1.5 }}>
            <AuthLogin />
          </Grid>
        </div>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
