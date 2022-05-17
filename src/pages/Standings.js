import {useState} from "react";
// material
import { Container, Stack, Typography } from '@mui/material';
import TextField from "@material-ui/core/TextField";
// components
import Page from '../components/Page';
import { ProductList } from '../sections/@dashboard/products';

// mock

// ----------------------------------------------------------------------

export default function Standings() {
    const [year, setYear] = useState(2022)

  return (
    <Page title="Standings">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Standings
        </Typography>

          <TextField
              id="outlined-number"
              label="year"
              type="number"
              value={year}
              onChange={e => setYear(e.currentTarget.value)}
              InputLabelProps={{
                  shrink: true,
              }}
          />

        <ProductList year={year} />
      </Container>
    </Page>
  );
}
