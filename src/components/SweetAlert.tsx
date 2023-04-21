// components/SweetAlert.tsx

import React, { useEffect, useState } from 'react';
import Swal, { SweetAlertOptions } from 'sweetalert2';

export interface SweetAlertData {
  options: SweetAlertOptions;
  callback?: (result: Swal.DismissReason) => void;
}

interface SweetAlertProps {
  sweetAlertData?: SweetAlertData;
}

export const SweetAlert: React.FC<SweetAlertProps> = ({ sweetAlertData }) => {
  useEffect(() => {
    if (sweetAlertData) {
      const { options, callback } = sweetAlertData;
      Swal.fire(options).then((result) => {
        if (callback) {
          callback(result.dismiss);
        }
      });
    }
  }, [sweetAlertData]);

  return null;
};
