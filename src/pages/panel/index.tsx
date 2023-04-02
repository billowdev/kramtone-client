import React from "react";
import GroupShopPanel from "./user/index";
import AdminPanel from "./admin/index";
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from "@/store/store";
import { authSelector, fetchSession  } from "@/store/slices/auth.slice";
import withAuth from '@/components/withAuth';
type Props = {};

function PanelPage({}: Props) {
  const dispatch = useAppDispatch();
  const userSession = useSelector(authSelector);
  const isLoading = userSession === undefined;
  
  React.useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  return (
    <React.Fragment>
    
      {userSession&&userSession.role === "admin" ? (
        // USER PANEL
        // ADMIN PANEL
        <AdminPanel />
        ) : (
        <GroupShopPanel />
      )}
    </React.Fragment>
  );
}

export default withAuth(PanelPage);
// export default PanelPage;

