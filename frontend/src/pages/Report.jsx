import React from 'react'
import ReportData from '../components/Reportdata'
import UpdatesAndCommits from '../components/UpdatesAndCommits'

function Report({user}) {
  return (
    <div>
      <ReportData user = {user}></ReportData>

      <UpdatesAndCommits user = {user}/>
    </div>
  )
}

export default Report
