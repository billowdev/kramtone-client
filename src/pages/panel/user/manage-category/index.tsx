import React from 'react'
import { useAppDispatch } from "@/store/store";
import { getAllProductByGroupAction, productSelector, deleteProductAction} from "@/store/slices/product.slice";
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@material-ui/core/styles";
import withAuth from "@/components/withAuth";

import Layout from '@/components/Layouts/Layout';
type Props = {}

function UserPanelManageCategory({}: Props) {
  return (
	<Layout>UserPanelManageCategory</Layout>
  )
}

export default withAuth(UserPanelManageCategory)