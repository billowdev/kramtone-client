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

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // Hide table row if not matched by filter
//   "&[data-hide='true']": {
//     display: "none",
//   },
// }));

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



interface TableData {
  id: number;
  name: string;
  age: number;
  gender: string;
}

interface TableProps {
  categoryArray: CategoryPayload[];
  gid:string,
  accessToken: string
}



const UserPanelManageCategory = ({ categoryArray, gid, accessToken }: TableProps) => {


  const dispatch = useAppDispatch();
  const [sortConfig, setSortConfig] = useState<{key: keyof CategoryPayload, direction: string}>({key: 'name', direction: 'ascending'});
  const [orderBy, setOrderBy] = useState("name");
  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("asc");

 
  const handleSort = (key: keyof CategoryPayload) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({key, direction});
  }


  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleDelete = (id: string) => {
    const data = {
      gid, accessToken, id
    }
    dispatch(deleteCategoryAction(data));
  };

  const handleEdit = (id: string) => {
    router.push(`/user/manage-category/edit/${id}`);
  };

  const handleCreate = () => {
    router.push("/user/manage-category/create");
  };

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
        marginBottom: "1rem" }}>
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
            {categoryArray.map((row) => (
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
    </Box>
    </Layout>
  );
  
  

};


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  
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
  

};


export default withAuth(UserPanelManageCategory)

