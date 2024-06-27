import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { citiesData } from '../Data/data';
interface CitySelectorProps {
    city: string;
    setCity: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ city, setCity }) => {
    return (
        <Select value={city} onChange={(e) => setCity(e.target.value as string)}>
            {citiesData.map((c) => (
                <MenuItem key={c.city} value={c.city}>
                    {c.city}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CitySelector;



























