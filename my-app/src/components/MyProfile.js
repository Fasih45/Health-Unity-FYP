import * as React from 'react';
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { Container, Grid } from '@mui/material';

const user = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    age:'30',
    dbo:'10/02/2000',
    password: '********', // Should not store passwords like this in real-world scenarios
    profilePic: 'https://placekitten.com/100/100', // Placeholder profile picture
  };


function MyProfile() {

    return (
        <Box
            sx={{
                width: '100%',
                p: 3,
            }}
        >
            <Card>
                <Box
                 display="flex"
                 flexDirection="Row"
                 p={1}
                  
                sx={{ mb: 1 }}>
                    <Typography level="title-md">Personal info</Typography>
                </Box>
                <Divider/>
                
                <Grid item padding={3} container rowSpacing={{xs:2}} columnSpacingspacing={{xs:4,sm:10,md:25,lg:5}}>
                    <Grid item xs={12} sm={6} lg={4}>
                    <Typography >Name: {user.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                    <Typography >Email: {user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                    <Typography >Age: {user.age}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                    <Typography >User Name: {user.username}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                    <Typography >Date of Birth: {user.dbo}</Typography>
                    </Grid>


                </Grid>
            </Card>
        </Box>
    )
};

export default MyProfile;