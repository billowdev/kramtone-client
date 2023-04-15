import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Layout from '@/components/Layouts/Layout';
import { InputBase, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from "@/store/store";
import { getAllCategoryByGroupAction, categorySelector, deleteCategoryAction } from "@/store/slices/category.slice";
import { useSelector } from "react-redux";
import httpClient from "@/common/utils/httpClient.util";
import withAuth from "@/components/withAuth";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";


import { CategoryPayload } from '@/models/category.model';


type Props = {
  // gid?: string,
  accessToken?: string,
  categoryArray?: CategoryPayload[]
}

function UserPanelManageCategory({ categoryArray }: Props) {
  const dispatch = useAppDispatch();
  // const categoryData = useSelector(categorySelector);

  // React.useEffect(() => {
  //   dispatch(getAllCategoryByGroupAction());
  // }, [dispatch]);


  interface Data {
    id: string;
    name: string;
    desc: string;
    image: string;
  }

  function createData(
    id: string | undefined = '',
    name: string | undefined = '',
    desc: string | undefined = '',
    image: string | undefined = ''
  ): Data {
    return {
      id,
      name,
      desc,
      image
    };
  }

  // const rows = [
  //   createData('2', 'nmaede23s', 'nmasdaedes'),
  //   createData('1', 'nmaedes', 'nmaedeasds'),
  // ];
  const rows = categoryArray?.map((category) =>
    createData(category.id, category.name, category.desc, category.image)
  ) ?? [];



  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  interface HeadCell {
    id: keyof Data;
    label: string;
    desc: boolean;
    name: boolean;
    image: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      name: false,
      desc: true,
      image: false,
      label: 'ชื่อประเภทสินค้า',
    },
    {
      id: 'desc',
      name: true,
      desc: false,
      image: false,
      label: 'รายละเอียดประเภทสินค้า',
    },
    {
      id: 'image',
      name: false,
      image: true,
      desc: false,
      label: 'รูปภาพ',
    },
  ];


  const DEFAULT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = 'name';
  const DEFAULT_ROWS_PER_PAGE = 5;

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, newOrderBy);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.name ? 'right' : 'left'}
              padding={headCell.desc ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
    // searchQuery : any;
    // onSearchQueryChange : any;
  }

  // function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  //   const { numSelected } = props;

  //   return (
  //     <Toolbar
  //       sx={{
  //         pl: { sm: 2 },
  //         pr: { xs: 1, sm: 1 },
  //         ...(numSelected > 0 && {
  //           bgcolor: (theme) =>
  //             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
  //         }),
  //       }}
  //     >
  //       {numSelected > 0 ? (
  //         <Typography
  //           sx={{ flex: '1 1 100%' }}
  //           color="inherit"
  //           variant="subtitle1"
  //           component="div"
  //         >
  //           {numSelected} selected
  //         </Typography>
  //       ) : (
  //         <Typography
  //           sx={{ flex: '1 1 100%' }}
  //           variant="h6"
  //           id="tableTitle"
  //           component="div"
  //         >
  //           ประเภทสินค้า
  //         </Typography>
  //       )}
  //       {numSelected > 0 ? (
  //         <Tooltip title="Delete">
  //           <IconButton>
  //             <DeleteIcon />
  //           </IconButton>
  //         </Tooltip>
  //       ) : (
  //         <Tooltip title="Filter list">
  //           <IconButton>
  //             <FilterListIcon />
  //           </IconButton>
  //         </Tooltip>
  //       )}
  //     </Toolbar>
  //   );
  // }

  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Data>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState<Data[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState<any>('');



  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage],
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );
      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy],
  );

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;



  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    // const { value } = event.target;
    console.log(event.target.value);
    // setSearchQuery(event);
  }

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, } = props;

    // const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   console.log(event.target.value)
    // };

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              ประเภทสินค้า
            </Typography>
            <TextField
              sx={{ ml: 2, flexShrink: 0 }}
              label="ค้นหา"
              // value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }


  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            // searchQuery={searchQuery}
            // onSearchQueryChange={handleSearchQueryChange}
            numSelected={selected.length}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.desc}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >

                          {row.image}
                        </TableCell>
                        {/* <TableCell align="right">{row.image}</TableCell> */}
                      </TableRow>
                    );
                  })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </Layout>
  );
}

export default withAuth(UserPanelManageCategory)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { data: response } = await httpClient.get(`/categories/getAllByGroup`, {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });
    const categoryArray = response.payload;
    // console.log(categoryArray)
    return {
      props: {
        accessToken,
        categoryArray
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};
