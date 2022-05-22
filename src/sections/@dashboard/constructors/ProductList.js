// material
import { Grid } from '@mui/material';
import {useEffect, useState} from "react";
import ProductConstructorCard from './ProductCard';

// ----------------------------------------------------------------------

export default function ProductConstructorList({ year }) {
  const [data1, setData] = useState(null);

  useEffect(()=>{
    fetch(`http://ergast.com/api/f1/${year}/constructorStandings.json`, {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data1 => {
            console.log(data1.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
            setData(data1.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        })
        .catch((err) => {
          console.log(err)
        });
  }, [year]);

  return (

      <Grid container spacing={3}>
        {data1 && data1.map((row, index) =>
            <Grid key={row} item xs={12} sm={6} md={3}>
                <ProductConstructorCard row={row} index={index}/>
            </Grid>
        )};
    </Grid>
  );
};
