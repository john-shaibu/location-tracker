
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import PageHelmet from '../components/Helmet'

import '../styles/dashboard.css'
import Map from '../components/Map'
import LocationHistory from '../components/LocationHistory'
import { useToggle } from '../hooks/useToggle'


const Dashboard = () => {

  const toggleState = useToggle(false)
  const [open,] = toggleState


  return (
    <div className="main-container">
      <PageHelmet title='Dashboard' keywords='location tracker, wander watch, location monitor' description='Wander watch Dashboard page' />
      <Header headerName='Dashboard' />
      <Sidenav toggleState={toggleState}  />
      <div className={`side-nav-underlay${open ? ' open': ''}`}></div>
      <div className="wrapper">
        <main>
          <Map />
          <LocationHistory />
        </main>
      </div>
    </div>
  )
}

export default Dashboard