import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import { UserOutlined, ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DashboardAppBar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderBottom: '2px solid white',
        }}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            style={{
              fontStyle: 'italic',
            }}
          >
            Fall in Fall
          </Typography>

          <Box>
            <Button
              style={{fontWeight:"bold"}}
              color={activeTab === 'pending' ? 'secondary' : 'inherit'}
              onClick={() => setActiveTab('pending')}
              startIcon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 8h1c1.656 0 3-1.345 3-3 0-1.656-1.344-3-3-3h-1v6zm-1 6h-10c-3.314 0-6 2.686-6 6h22c0-3.314-2.686-6-6-6zm4.015 2c.243.618.423 1.277.551 1.968h-16.132c.128-.691.308-1.35.551-1.968h15.03zm-3.015-10v-6h-14v6c0 3.188 2.566 6 6 6h2c3.434 0 6-2.812 6-6z" />
                </svg>
              }
            >
              Bekleyen Fallar
            </Button>
            <Button
              style={{fontWeight:"bold"}}
              color={activeTab === 'viewed' ? 'secondary' : 'inherit'}
              onClick={() => setActiveTab('viewed')}
              startIcon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 8h1c1.656 0 3-1.345 3-3 0-1.656-1.344-3-3-3h-1v6zm-1 6h-10c-3.314 0-6 2.686-6 6h22c0-3.314-2.686-6-6-6zm4.015 2c.243.618.423 1.277.551 1.968h-16.132c.128-.691.308-1.35.551-1.968h15.03zm-3.015-10v-6h-14v6c0 3.188 2.566 6 6 6h2c3.434 0 6-2.812 6-6z" />
                </svg>
              }
            >
              Baktığım Fallar
            </Button>
            <Button
              style={{ fontWeight: "bold" }}
              startIcon={<UserOutlined />}
              onClick={() => navigate('/fortunetellerprofile')} // Yönlendirme burada
            >
              Profil
            </Button>

          </Box>
        </Toolbar>
      </AppBar>

      {/* Divider below the AppBar */}
      <Divider />
    </>
  );
};

export default DashboardAppBar;
