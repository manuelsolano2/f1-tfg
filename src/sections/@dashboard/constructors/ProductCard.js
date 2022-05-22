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

ProductConstructorCard.propTypes = {
  row: PropTypes.object,
};



export default function ProductConstructorCard({ row , index}) {

    const {constructorId, name, nationality, url} = row.Constructor
    const {points, wins, position} = row

    const handleError = i => {
        i.target.src = "/static/Drivers/Default.jpeg";
        return null;
    };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={constructorId} src={`/static/Drivers/${constructorId}.jpeg`} onError={handleError} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
            {position}º&nbsp;{name}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" style={{opacity: '50%'}}>
            Wins: {wins}
          </Typography>

            <Typography>
                {points}pts
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
