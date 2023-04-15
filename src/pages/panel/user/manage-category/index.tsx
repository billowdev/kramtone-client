import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, tableCellClasses, Button, IconButton, TableSortLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Layout from '@/components/Layouts/Layout';
import { useAppDispatch } from "@/store/store";
import { getAllCategoryByGroupAction, categorySelector, deleteCategoryAction } from "@/store/slices/category.slice";
import router from "next/router";
import * as categoryService from "@/services/category.service"
import { CategoryPayload } from "@/models/category.model"
import { useSelector } from "react-redux";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import * as authService from "@/services/auth.service"
import withAuth from "@/components/withAuth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';


import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // Hide table row if not matched by filter
  "&[data-hide='true']": {
    display: "none",
  },
}));

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

interface PageProps {
  categoryArray?: CategoryPayload[];
  gid?: string,
  accessToken?: string
}

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'name';
const DEFAULT_ROWS_PER_PAGE = 5;





const UserPanelManageCategory = ({ categoryArray, gid, accessToken }: PageProps) => {

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
  
  const rows = categoryArray?.map((category) =>
  createData(category.id, category.name, category.desc, category.image)
  ) ?? [];
  
  
  const dispatch = useAppDispatch();
  const [sortConfig, setSortConfig] = useState<{ key: keyof CategoryPayload, direction: string }>({ key: 'name', direction: 'ascending' });
  const [filterText, setFilterText] = useState("");


  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Data>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState<Data[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);

  const handleSort = (key: keyof CategoryPayload) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }


  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleDelete = (id: string) => {
    const groupId = gid!;
    const toekn = accessToken!;
    const data = {
      gid: groupId, accessToken: toekn, id
    }
    dispatch(deleteCategoryAction(data));
  };

  const handleEdit = (id: string) => {
    router.push(`/user/manage-category/edit/${id}`);
  };

  const handleCreate = () => {
    router.push("/user/manage-category/create");
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



  return (
    <Layout>
      <Box sx={{
        mt: "16px",
        ml: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "1rem"
        }}>
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            sx={{ width: "100%", marginRight: "1rem" }}
          />
          <Button variant="contained" onClick={handleCreate}>Add</Button>
        </Box>
        <TableContainer sx={{ width: "100%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ชื่อประเภทสินค้า</StyledTableCell>
                <StyledTableCell>รายละเอียดประเภทสินค้า</StyledTableCell>
                <StyledTableCell>รูปภาพ</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryArray && categoryArray.map((row) => (
                <StyledTableRow key={row.id} data-hide={!row.name.toLowerCase().includes(filterText.toLowerCase())}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.desc}</StyledTableCell>
                  <StyledTableCell>{row.image}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categoryArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Box>
    </Layout>
  );



};


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)

    const categoryArray = await categoryService.getAllCategoryByGroup(accessToken!)
    return {
      props: {
        gid,
        accessToken,
        categoryArray
      },
    };
  } catch (e: any) {
    return {
      props: {

      },
    };
  }

};


export default withAuth(UserPanelManageCategory)

