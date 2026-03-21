import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { Icon } from './Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function IconSelector({ iconList }) {
    return iconList.map((tag) => {
        return (
            <MenuItem key={tag.name} value={JSON.stringify(tag)}>
                <ListItemIcon>
                    <Icon name={tag.icon} />
                </ListItemIcon>
                <ListItemText>{tag.name}</ListItemText>
            </MenuItem>
        );
    });
}
