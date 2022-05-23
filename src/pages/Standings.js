import {useEffect, useState} from "react";
// material
import {Container, FormControl, MenuItem, Select, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import {ProductList} from '../sections/@dashboard/products/index';

// mock

// ----------------------------------------------------------------------

export default function Standings() {
    const [year, setYear] = useState(2022)
    const [selector, setSelector] = useState([]);

    useEffect(()=>{
        fetch(`https://ergast.com/api/f1/seasons.json?limit=100`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(selector => {
                setSelector(selector.MRData.SeasonTable.Seasons);


            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

  return (
    <Page title="Standings">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Standings
        </Typography>
          <Stack>
              <FormControl sx={{ m: 1, width: 300, mt: 3 }} >
                  <Select
                      MenuProps={{
                          PaperProps: { sx: { maxHeight: 200 }}
                      }}
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      color='error'
                      bgcolor='error'
                      value={year}
                      onChange={e => setYear(e.target.value)}
                  >
                      {selector.map((row, index) => {
                          return (
                              <MenuItem key={index} value={row.season}>{row.season}</MenuItem>
                          )
                      })}

                  </Select>
              </FormControl>

          </Stack>
          <div style={{height: '50px'}}/>
        <ProductList year={year} />
      </Container>
    </Page>
  );
}
