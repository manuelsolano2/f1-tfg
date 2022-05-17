import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import {useEffect, useState} from "react";
import { fCurrency } from '../../../utils/formatNumber';
// components


// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  row: PropTypes.object,
};



export default function ShopProductCard({ row }) {

    const {code, dateOfBirth, driverId, familyName, givenName, nationality, permanentNumber, url} = row.Driver

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={code} src={`/static/Drivers/${familyName}.jpeg`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {familyName}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" style={{opacity: '50%'}}>
            {code}
          </Typography>
            <Typography variant="subtitle1">
            {row.points} pts
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
