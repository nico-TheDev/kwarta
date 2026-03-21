import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownType({ handleChange, transactionType, disabled }) {
    return (
        <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Type</InputLabel>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={transactionType}
                label='Type'
                onChange={handleChange}
                disabled={disabled}
            >
                <MenuItem value='expense'>Expense</MenuItem>
                <MenuItem value='income'>Income</MenuItem>
                <MenuItem value='savings'>Savings</MenuItem>
                <MenuItem value='investments'>Investments</MenuItem>
            </Select>
        </FormControl>
    );
}
