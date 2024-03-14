import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import TimeDropdown from "../components/TimeDropDown";
import HistoryDurationDropdown from "../components/HistoryDurationDropdown";
import PageHelmet from "../components/Helmet";
import ToggleThemes from "../components/ToggleThemes";
import ToggleNotifications from "../components/ToggleNotifications";
import "../styles/dashboard.css";
import "../styles/settings.css";
import { useToggle } from "../hooks/useToggle";

const Settings = () => {
  const toggleState = useToggle(false);
  const [open] = toggleState;

  return (
    <div className="main-container">
      <PageHelmet
        title="Dashboard"
        keywords="location tracker, wander watch, location monitor"
        description="Wander watch Dashboard page"
      />
      <Header headerName="Metrics" />
      <Sidenav toggleState={toggleState} />
      <div className={`side-nav-underlay${open ? " open" : ""}`}></div>
      <div className="settings-wrapper">
          <main>
            <div className="settings-container">
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="font-[700] text-[1.6em] mb-8">General Settings</h2>
                  <div className="flex justify-between">
                    <div className="">
                      <h3 className=" font-[600] text-[18px] mb-2">
                        Tracking Interval
                      </h3>
                      <p className="text-[#878CA8] text-[.9em] md:pr-6">
                        This setting controls how often the app updates your
                        location. A shorter interval means more frequent updates,
                        which can drain your battery faster, but provides a more
                        precise track of your movements. A longer interval uses less
                        battery but may not capture your location as accurately,
                        especially if you're moving quickly
                      </p>
                    </div>
                    <div className="w-55">
                      <TimeDropdown />
                    </div>
                  </div>

                </div>
                <div className="flex justify-between">
                  <div className="">
                    <h3 className=" font-[600] text-[18px] mb-2">
                      Location History
                    </h3>
                    <p className="text-[#878CA8] text-[.9em] md:pr-6">
                      Define how long the application stores your past location
                      data
                    </p>
                  </div>
                  <div className="w-55">
                    <HistoryDurationDropdown />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="">
                    <h3 className=" font-[600] text-[18px] mb-2">Theme Mode</h3>
                    <p className="text-[#878CA8] text-[.9em] pr-6">
                      Switch between light and dark mode{" "}
                    </p>
                  </div>
               
           <ToggleThemes/>
                  
                </div>

                <div className="flex justify-between">
                  <div className="">
                    <h3 className=" font-[600] text-[18px] mb-2">Notification</h3>
                    <p className="text-[#878CA8] text-[.9em] md:pr-6">
                      Enable notification to be alerted when you've been in a
                      location for more than dwell time.{" "}
                    </p>
                  </div>
                 <ToggleNotifications/>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <h2 className="font-[700] text-[1.6em]">Advanced Settings</h2>
                <div className="flex justify-between">
                  <div className="mb-10">
                    <h3 className=" font-[600] text-[18px] mb-2">Export Data</h3>
                    <p className="text-[#878CA8] text-[.9em] md:pr-8">
                      Export your Wander Watch data to a downloadable format for
                      future reference or personal analysis.
                    </p>
                  </div>
                  <div className="w-55">
                    <button className="primary-btn w-[6.5rem] h-[2.5rem]">
                      Export
                    </button>
                  </div>
                </div>
              </div>

             

              <div className="flex flex-col gap-8">
                <h2 className="font-[700] text-[1.6em]">Privacy Settings</h2>
                <div className="flex justify-between">
                  <div className="">
                    <h3 className=" font-[600] text-[18px] mb-2">Data sharing</h3>
                    <p className="text-[#878CA8] text-[.9em]">
                      Our location tracking web app collects and utilizes location
                      and device information to deliver location-based services,
                      improve user experience, and may share data with third-party
                      service providers for analytics and legal compliance, all
                      while ensuring stringent data security measures and allowing
                      users the option to control data sharing and retention, with
                      updates to the policy communicated transparently.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mb-10">
                    <h3 className=" font-[600] text-[18px] text-[#ff2f2f] mb-2">
                      Data Deletion
                    </h3>
                    <p className="text-[rgb(135,140,168)] text-[.9em] md:pr-8 mb-7">
                      Privacy Under Your Control:  Completely erase your location
                      data from Wander Watch whenever you want.
                    </p>
                  </div>
                  <div className="w-55">
                    <button className="red-btn w-[6.5rem] h-[2.5rem]">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                
               
              </div>
            </div>
          </main>
      </div>
    </div>
  );
};

export default Settings;
