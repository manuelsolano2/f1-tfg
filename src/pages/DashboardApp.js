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
    const [lastRace, setLastRace] = useState(null);
    const [lastQualy, setLastQualy] = useState(null);

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

        fetch(`http://ergast.com/api/f1/current/last/results.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(lastRace => {
                setLastRace(lastRace.MRData.RaceTable.Races[0]);
            })
            .catch((err) => {
                console.log(err)
            });

        fetch(`http://ergast.com/api/f1/current/last/qualifying.json`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(lastQualy => {
                setLastQualy(lastQualy.MRData.RaceTable.Races[0].QualifyingResults[0]);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);


    if (lastRace && lastQualy) {
        return (
        <Page title="Dashboard">
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Drivers" total={driver} icon={'mdi:racing-helmet'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Constructors" total={constructor} color="info" icon={'clarity:shield-solid'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Circuits" total={circuit} color="warning" icon={'maki:racetrack'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Total Seasons" total={season} color="error" icon={'akar-icons:calendar'} />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                  <Card >
                      <CardHeader
                          title='Latest Results'
                          subheader='Latest results from the last race'
                          style={{paddingBottom:'20px'}}
                      />
                          <Typography style={{paddingLeft:'5%', paddingBottom:'20px'}}>
                              The last race was in <b>{lastRace.Circuit.Location.locality}</b>,
                              &nbsp;<b>{lastRace.Circuit.Location.country}</b>.
                              &nbsp;It was the <b>{lastRace.raceName}</b>.<br/><br/>
                              The winner of the qualification who won the pole position was <b>{lastQualy.Driver.familyName}</b>,
                              &nbsp;with a lap time on the Q3 of <b>{lastQualy.Q3}</b>.<br/><br/>
                              The winner of the <b>{lastRace.raceName}</b> was <b>{lastRace.Results[0].Driver.familyName}</b>,
                              with a total time of <b>{lastRace.Results[0].Time.time}</b>,
                              winning a total points of <b>{lastRace.Results[0].points}</b> points.<br/><br/>
                          </Typography>

                  </Card>
              </Grid>
            </Grid>
          </Container>
        </Page>
  );
}
    return null;

}
