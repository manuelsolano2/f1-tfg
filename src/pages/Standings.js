// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList } from '../sections/@dashboard/products';
// mock

// ----------------------------------------------------------------------

export default function Standings() {

  return (
    <Page title="Standings">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Standings
        </Typography>
        <ProductList/>
      </Container>
    </Page>
  );
}
