import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import {useEffect, useState} from "react";

// ----------------------------------------------------------------------

export default function Users() {

  const [table, setTable] = useState(null);

  useEffect(()=>{
    fetch('http://ergast.com/api/f1/current/last/results.json', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
          setTable(data.MRData.RaceTable.Races[0]);
        })
        .catch((err) => {
          console.log(err)
        });
  }, []);

  const users = table.Results.map((row) => ({
    code: row.Driver.code,
    dateOfBirth: row.Driver.dateOfBirth,
    driverId: row.Driver.driverId,
    familyName: row.Driver.familyName,
    givenName: row.Driver.givenName,
    nationality: row.Driver.nationality,
    permanentNumber: row.Driver.permanentNumber,
    url: row.Driver.url,
  }))

  return users;
}
