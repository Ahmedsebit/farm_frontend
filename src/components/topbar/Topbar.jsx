import React from 'react'
import "./Topbar.css"
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';


export default function Topbar() {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">Farm-Or</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <CircleNotificationsIcon/>
                </div>
                <div className="topbarIconContainer">
                    <LanguageIcon/>
                </div>
                <div className="topbarIconContainer">
                    <SettingsIcon/>
                </div>
            </div>
        </div>
    </div>
  )
}
