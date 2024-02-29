"use client"

import React from 'react'
import DashboardComponent from '@/components/Dashboardcomponent'

const DasboardLayout = ({ children }) => {
    return (
        <div>
            <DashboardComponent/>
                {children}
        </div>
    )
}

export default DasboardLayout;