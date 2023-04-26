import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ProductPayload } from "@/models/product.model";

type Props = {
  product?: ProductPayload;
}

function UserPanelProduct({}: Props) {
  return (
	<div>UserPanelProduct</div>
  )
}


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { id } = context.params;
    // const product = await getProductById(id);

  return {
      props: {
        // product
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};

export default UserPanelProduct