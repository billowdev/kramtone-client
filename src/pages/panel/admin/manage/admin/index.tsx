import withAuth from '@/components/withAuth'
import React from 'react'

type Props = {}

function ManageAdminPage({}: Props) {
  return (
	<div>ManageAdminPage</div>
  )
}

export default withAuth(ManageAdminPage)
// export default ManageAdminPage