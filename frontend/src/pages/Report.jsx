import React from 'react'
import ReportData from '../components/Reportdata'

function Report({user}) {
  return (
    <div>
      <ReportData user = {user}></ReportData>
    </div>
  )
}

export default Report
