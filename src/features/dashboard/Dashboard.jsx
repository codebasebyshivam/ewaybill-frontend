// src/components/MainContent.js
import React from 'react';
import DashboardCard from './DashboardCard';
import {
    Bell,
    Search,
    DollarSign,
    Users,
    ListTodo,
    PieChart
} from 'lucide-react';
import kats_logo from '../../assets/kats_logo.svg'
import { dashboardTimestamp, greetUser } from '../../utils/greet.user';
import SalesChart from './SalesChart';


const Card = ({ children }) => {
    // console.log(children);
    return (
        <div className=' bg-[#f5f7f9] rounded-lg p-4'>
            {children}
        </div>
    );
}

const Dashboard = () => {
    return (
        <main className="flex-1 p-8 overflow-y-auto bg-white">
            {/* Header */}
            <header className="flex flex-col justify-between items-center gap-4">
                <h6 className="text-base font-semibold font-nunito  text-h1">{dashboardTimestamp()}</h6>
                <h1 className="text-3xl font-poppins font-semibold text-h1">{`${greetUser()} John `}</h1>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-4">
                <Card >
                    <h1>Doc Attached</h1>
                    <div className="flex justify-between items-center gap-4">
                        <img src={kats_logo} alt="kats_logo" className="w-20 h-20 object-contain" />
                        <div className="flex flex-col space-y-1">
                            <span>Total Doc: 11784</span>
                            <span>Week Doc: 0</span>
                            <span>Monthly Doc: 0</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h1>Ewaybill</h1>
                    <div className='grid grid-cols-2'>
                        <img src={kats_logo} alt='kats_logo' />
                        <div className='flex flex-col'>
                            <span>Total Ewaybills : 11784</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <h1>Truck Verify</h1>
                    <div className='grid  grid-cols-2'>
                        <img src={kats_logo} alt='kats_logo' />
                        <div className='flex flex-col'>
                            <span>Verified : 11784</span>s
                            <span>Unverified : 11784</span>
                        </div>
                    </div>
                </Card>
            </div >
            <SalesChart />
        </main >
    );
};

export default Dashboard;
