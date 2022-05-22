import {useEffect, useState} from "react";
// @mui
import {Grid, Container, Typography, Card, Stack, CardHeader, Box} from '@mui/material';
// components
import Page from '../components/Page';
// sections
import {
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
    const [driver, setDriver] = useState(0);
    const [circuit, setCircuit] = useState(0);
    const [constructor, setConstructor] = useState(0);
    const [season, setSeason] = useState(0);
    const [lastRace, setLastRace] = useState('undefined');
    const [lastQualy, setLastQualy] = useState('undefined');

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/drivers.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(driver => {
                setDriver(driver.MRData.total);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/constructors.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(constructor => {
                setConstructor(constructor.MRData.total);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/circuits.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(circuit => {
                setCircuit(circuit.MRData.total);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/seasons.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(season => {
                setSeason(season.MRData.total);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/current/last/results.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(lastRace => {
                console.log(lastRace.MRData.RaceTable.Races[0].Circuit.Location.locality);
                console.log(lastRace.MRData.RaceTable.Races[0].Circuit.Location.country);
                console.log(lastRace.MRData.RaceTable.Races[0].raceName);
                console.log(lastRace.MRData.RaceTable.Races[0].Results[0].Driver.familyName);
                console.log(lastRace.MRData.RaceTable.Races[0].Results[0].Time.time);
                console.log(lastRace.MRData.RaceTable.Races[0].Results[0].points);
                setLastRace(lastRace.MRData.RaceTable.Races[0]);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/current/last/qualifying.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(lastQualy => {
                console.log(lastQualy.MRData.RaceTable.Races[0].QualifyingResults[0].Q3);
                console.log(lastQualy.MRData.RaceTable.Races[0].QualifyingResults[0].Driver.familyName);
                setLastQualy(lastQualy.MRData.RaceTable.Races[0].QualifyingResults[0]);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);
    // aqui es donde estoy teniendo el problema al final santi, con la llamada de locality y de country en el ultimo typography
    // he intentado lo del doble ampersand abajo del return con el Page pero que va, sino lo miramos esta tarde
    // he dejado en el console log las llamadas como son, aunque abajo están todas de todas formas
    return (
        <Page title="Dashboard">
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Drivers" total={driver} icon={'ant-design:android-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Constructors" total={constructor} color="info" icon={'ant-design:apple-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Circuits" total={circuit} color="warning" icon={'ant-design:windows-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Seasons" total={season} color="error" icon={'ant-design:bug-filled'} />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                  <Card >
                      <CardHeader
                          title='Latest Results'
                          subheader='Latest results from the last race'
                          style={{paddingBottom:'20px'}}
                      />
                          <Typography style={{paddingLeft:'5%', paddingBottom:'20px'}}>
                              The last race was in {lastRace.Circuit.Location.locality},
                              {lastRace.Circuit.Location.country}.
                              It was the {lastRace.raceName}<br/><br/>

                              The winner of the qualification who won the pole position was {lastQualy.Driver.familyName},
                              with a lap time on the Q3 of {lastQualy.Q3}.<br/><br/>
                              The winner of the {lastRace.Circuit.Location.locality} was
                              {lastRace.Results[0].Driver.familyName},
                              with a total time of {lastRace.Results[0].Time.time}
                              winning a total points of {lastRace.Results[0].points}<br/><br/>
                          </Typography>

                  </Card>
              </Grid>
            </Grid>
          </Container>
        </Page>
  );
}
