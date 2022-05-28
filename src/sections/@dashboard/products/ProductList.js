// material
import { Grid } from '@mui/material';
import {useEffect, useState} from "react";
import ProductCard from './ProductCard';

// ----------------------------------------------------------------------

export default function ProductList({ year }) {
  const [data1, setData] = useState(null);

  useEffect(()=>{
    fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`, {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data1 => {
            setData(data1.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        })
        .catch((err) => {
          console.log(err)
        });
  }, [year]);

  return (

      <Grid container spacing={3}>
        {data1 && data1.map((row, index) =>
            <Grid key={row} item xs={12} sm={6} md={3}>
                <ProductCard row={row} index={index}/>
            </Grid>
        )}
    </Grid>
  );
};
