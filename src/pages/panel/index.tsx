import React from "react";
import GroupShopPanel from "./user/index";
import AdminPanel from "./admin/index";
import { useSelector } from 'react-redux';
import { authSelector } from "@/store/slices/auth.slice";
import withAuth from '@/components/withAuth';

type Props = {};

function PanelPage({}: Props) {

  const userSession = useSelector(authSelector);
  return (
    <React.Fragment>
      {userSession&&userSession.role === "user" ? (
        // USER PANEL
        <GroupShopPanel />
      ) : (
        // ADMIN PANEL
        <AdminPanel />
      )}
    </React.Fragment>
  );
}

export default withAuth(PanelPage);
// export default PanelPage;

