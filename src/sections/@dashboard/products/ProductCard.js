import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
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



export default function ShopProductCard({ row , index}) {

    const {code, driverId, familyName} = row.Driver

    const handleError = i => {
        i.target.src = "/static/Drivers/Default.jpeg";
        return null;
    };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={code} src={`/static/Drivers/${driverId}.jpeg`} onError={handleError} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
            {index+1}º&nbsp;{familyName}
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
