import React, { useState, memo } from 'react';
import {
    Home,
    BarChart3,
    Users,
    Settings,
    FileText,
    Calendar,
    Bell,
    HelpCircle,
    Menu,
    X,
    ChevronDown,
    LogOut,
} from 'lucide-react';

import kats_logo from '../../../assets/kats_logo.svg';
import default_profile from '../../../assets/company_icon.png';
import { NavLink } from 'react-router-dom';

const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/profile' },

    {
        id: 'doc-attach',
        icon: BarChart3,
        label: 'Doc Attach',
        path: '/analytics',
    },
    {
        id: 'dl',
        icon: Users,
        label: 'Driving License',
        path: '/profile/dl',
        // subItems: [
        //     { id: 'all-users', label: 'All Users', path: '/users/all' },
        //     { id: 'roles', label: 'Roles & Permissions', path: '/users/roles' },
        //     { id: 'teams', label: 'Teams', path: '/users/teams' }
        // ]
    },
    { id: 'ewaybill', icon: FileText, label: 'Ewaybill', path: '/profile/ewaybill' },
    { id: 'fastag', icon: Calendar, label: 'Fastag', path: '/profile/fastag' },
    { id: 'rc', icon: Bell, label: 'RC Status', path: '/profile/RC' },
];

const bottomMenuItems = [
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export const MenuItem = React.memo(({ item, isBottom = false }) => {
    const [expandedItem, setExpandedItem] = useState(null);
    const Icon = item.icon;
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const isExpanded = expandedItem === item.id;
    const handleExpandClick = () => {
        setExpandedItem(isExpanded ? null : item.id);
    };

    return (
        <div className="mb-1">
            <NavLink
                to={item.path}
                {...(item.id === 'dashboard' ? { end: true } : {})}
                className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer
            transition-all duration-200 ease-in-out group
            ${isActive
                        ? 'bg-white text-h1 shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
            ${isBottom ? 'hover:bg-gray-50' : ''}`
                }
            >
                <div className="flex items-center space-x-3">
                    <Icon
                        size={20}
                        className={`
                transition-all duration-200
                text-gray-500 group-hover:text-gray-700
              `}
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                </div>
                {hasSubItems && (
                    <ChevronDown
                        size={16}
                        className={`
                transition-transform duration-200
                ${isExpanded ? 'rotate-180' : ''}
                text-gray-400
              `}
                        onClick={e => {
                            e.preventDefault();
                            handleExpandClick();
                        }}
                    />
                )}
            </NavLink>

            {hasSubItems && isExpanded && (
                <div className="ml-6 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                        <NavLink
                            key={subItem.id}
                            to={subItem.path}
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 text-sm rounded-md cursor-pointer transition-colors duration-150 ${isActive ? 'bg-white text-h1' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                            }
                        >
                            <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                            {subItem.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
});



const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg border hover:bg-gray-50 transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`overflow-auto h-[100dvh]
        fixed left-0 top-0  bg-[#F5F7F9]  z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-72 flex flex-col
      `}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="bg-action-button-gradient rounded-lg flex items-center justify-center">
                            <img src={kats_logo} alt="kats_logo" className="w-10 h-10 p-2 " />
                        </div>
                        <div>
                            <h1 className="font-poppins text-xl sm:text-2xl lg:text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                Kats
                            </h1>
                        </div>
                    </div>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-10 h-10  rounded-full flex items-center justify-center`}
                        >
                            <img
                                src="../src/"
                                className="w-7 h-7"
                                alt="user_profile_pic"
                                onError={(e) => (e.target.src = default_profile)}
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900 text-sm">
                                Shree Balaji Transport ...
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <MenuItem key={item.id} item={item} />
                        ))}
                    </div>
                </nav>

                {/* Bottom Section - structured to place Logout at very bottom */}
                <div className="px-4 py-6 border-t border-gray-200 flex flex-col space-y-4">
                    {/* Other Bottom Menu Items */}
                    <div className="space-y-1">
                        {bottomMenuItems.map((item) => (
                            <MenuItem key={item.id} item={item} isBottom={true} />
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div
                            className="flex items-center px-3 py-2.5 rounded-lg  cursor-pointer bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                        >
                            <LogOut size={18} className="mr-3" />
                            <span className="font-medium text-sm">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Sidebar);
