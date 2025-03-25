'use client';

import { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { CampgroundItem, createCampgroundItem } from '../../../../../interface';
import createCampground from '@/libs/createcampground';
import { useSession } from 'next-auth/react';

export default function CreateCampgroundForm() {
    const { data: session, status } = useSession();
    const [campground, setCampground] = useState<createCampgroundItem>({
        name: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        picture: '',
        dailyrate: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCampground(prev => ({
            ...prev,
            [name]: name === 'dailyrate' ? Number(value) : value, // Convert `dailyrate` to number
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.token) {
            console.error('No authentication token found!');
            return;
        }
        
        try {
            await createCampground(campground, session.user.token);
            console.log('Campground Created Successfully:', campground);
        } catch (error) {
            console.error('Error creating campground:', error);
        }
    };

    return (
        <Paper elevation={3} className="p-5">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Image Preview */}
                    <Grid item xs={12} sm={4}>
                        {campground.picture && (
                            <img
                                src={campground.picture}
                                alt="Preview"
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        )}
                    </Grid>

                    {/* Form Fields */}
                    <Grid item xs={12} sm={8}>
                        <TextField label="Campground Name" name="name" value={campground.name} onChange={handleChange} fullWidth required />
                        <TextField label="Address" name="address" value={campground.address} onChange={handleChange} fullWidth required />
                        <TextField label="District" name="district" value={campground.district} onChange={handleChange} fullWidth required />
                        <TextField label="Province" name="province" value={campground.province} onChange={handleChange} fullWidth required />
                        <TextField label="Postal Code" name="postalcode" value={campground.postalcode} onChange={handleChange} fullWidth required />
                        <TextField label="Telephone" name="tel" value={campground.tel} onChange={handleChange} fullWidth required />
                        <TextField label="Picture URL" name="picture" value={campground.picture} onChange={handleChange} fullWidth required />
                        <TextField label="Daily Rate" name="dailyrate" type="number" value={campground.dailyrate} onChange={handleChange} fullWidth required />
                        <Button type="submit" variant="contained" color="primary" className="mt-3">
                            Create Campground
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
