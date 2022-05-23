import {filter} from 'lodash';
import {useEffect, useState} from 'react';
// material
import {
  Card,
  Container, FormControl, MenuItem, Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead, UserListToolbar} from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const CIRCUITS_HEAD = [
  { id: 'circuitName', label: 'Circuit Name', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'locality', label: 'Locality', alignRight: false },
  { id: 'lat', label: 'Lat', alignRight: false },
  { id: 'long', label: 'Long', alignRight: false },
  { id: 'url', label: 'Url', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.circuitName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Circuits() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [table, setTable] = useState([]);
  const [year, setYear] = useState(2022)
  const [selector, setSelector] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - table.length) : 0;

  const filteredUsers = applySortFilter(table, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

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

  useEffect(()=>{
    fetch(`https://ergast.com/api/f1/${year}/circuits.json`, {
      method: 'GET',
    }).then(response => response.json())
        .then(data => {
          setTable(data.MRData.CircuitTable.Circuits || []);
        })
        .catch((err) => {
          console.log(err)
        });
  }, [year]);

  return (
    <Page title="Circuits">
      <Container>
        <Typography variant="h4" gutterBottom>
          Circuits
        </Typography>

        <FormControl sx={{ m: 2, width: 300 }} >
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

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={CIRCUITS_HEAD}
                    rowCount={table.length}
                />
                <TableBody>

                  {table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const {circuitId, circuitName, Location, url} = row
                    const { country, lat, locality, long } = Location;
                    const isItemSelected = selected.indexOf(circuitName) !== -1;

                    if ((filterName || '').length && circuitName.toLowerCase().indexOf(filterName.toLowerCase()) === -1) return <></>

                    return (
                        <TableRow
                            hover
                            key={circuitId}
                            tabIndex={-1}
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{circuitName}</TableCell>
                          <TableCell align="left">{country}</TableCell>
                          <TableCell align="left">{locality}</TableCell>
                          <TableCell align="left">{lat}</TableCell>
                          <TableCell align="left">{long}</TableCell>
                          <TableCell align="left">
                            <a href={url} target="_blank" rel="noopener noreferrer">Url</a>
                          </TableCell>

                        </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={table.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>


      </Container>
    </Page>
  );
}
