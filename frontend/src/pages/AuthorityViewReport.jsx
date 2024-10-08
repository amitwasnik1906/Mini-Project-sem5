import React from 'react'
import ReportData from '../components/Reportdata'

function AuthorityViewReport({ user }) {
  return (
    <div>
      <ReportData user={user} />
    </div>
  )
}

export default AuthorityViewReport
