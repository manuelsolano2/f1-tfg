import {useEffect, useState} from "react";
// material
import {Container, FormControl, Grid, MenuItem, Select, Stack, Typography} from '@mui/material';
import TextField from "@material-ui/core/TextField";
// components
import Page from '../components/Page';
import {ProductConstructorList} from '../sections/@dashboard/constructors/index';
import ShopProductCard from "../sections/@dashboard/products/ProductCard";

// mock

// ----------------------------------------------------------------------

export default function ConstructorStandings() {
    const [year, setYear] = useState((new Date().getFullYear()))
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
    <Page title="Constructors">
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
        <ProductConstructorList year={year} />
      </Container>
    </Page>
  );
}
