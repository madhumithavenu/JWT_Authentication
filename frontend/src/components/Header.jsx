import React from 'react';
import {AppBar, Box, Tab, Tabs, Toolbar, Typography} from "@mui/material";

function Header() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant='h3'>MernAuth</Typography>
          <Box>
            <Tabs>
              <Tab/>
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header