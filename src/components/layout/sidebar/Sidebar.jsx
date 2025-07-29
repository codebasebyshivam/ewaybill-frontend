import React, { useState, memo, useEffect } from 'react';
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
import useAuthStore from '../../../store/useAuthStore';
import useLogout from '../../../hooks/useLogout';
import { createPortal } from 'react-dom';
import DeleteModal from '../../common/DeleteModal';
import { NavLink, useLocation } from 'react-router-dom'; // Import BrowserRouter

// Define menu items and their structure
const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/profile' },
    {
        id: 'doc-attach',
        icon: BarChart3,
        label: 'Doc Attach',
        path: 'http://13.126.159.250:4453/', // External link
    },
    {
        id: 'dl',
        icon: Users,
        label: 'Driving License',
        path: '/profile/dl',
    },
    {
        id: 'ewaybill',
        icon: FileText,
        label: 'Ewaybill',
        path: '/profile/ewaybill',
    },
    { id: 'fastag', icon: Calendar, label: 'Fastag', path: '/profile/fastag' },
    {
        id: 'rc',
        icon: Bell,
        label: 'RC Status',
        path: '/profile/rc/bulk-upload', // Path for main item to be active if any sub-item is active
        subItems: [
            { id: 'bulk-upload', label: 'Bulk Upload', path: '/profile/rc/bulk-upload' },
            // { id: 'vehicle-search', label: 'RC Search', path: '/profile/rc/rc-search' },
            { id: 'all-rc', label: 'All RC', path: '/profile/rc/all-rc' }
        ]
    },
];

const bottomMenuItems = [
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

/**
 * MenuItem Component
 * Renders a single menu item with potential sub-items.
 * Applied premium styling for active, hover, and default states.
 */
export const MenuItem = memo(({ item, isBottom = false }) => {
    const [expandedItem, setExpandedItem] = useState(null);
    const Icon = item.icon;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const location = useLocation(); // Get current location

    // Determine if the current item is conceptually active (for parent items with sub-routes)
    const isConceptuallyActive = hasSubItems
        ? item.subItems.some(subItem => location.pathname.startsWith(subItem.path))
        : (location.pathname === item.path || (item.id === 'dashboard' && location.pathname === '/profile')); // Adjusted for dashboard path

    // Effect to expand the parent item if one of its sub-items is active on initial load
    useEffect(() => {
        if (hasSubItems && isConceptuallyActive) {
            setExpandedItem(item.id);
        }
    }, [hasSubItems, isConceptuallyActive, item.id]);

    const isExpanded = expandedItem === item.id;

    const handleToggleExpansion = (e) => {
        // Only toggle if it has sub-items
        if (hasSubItems) {
            e.preventDefault(); // Prevent NavLink navigation if it's a parent with sub-items
            setExpandedItem(isExpanded ? null : item.id);
        }
    };

    return (
        <div className="mb-1">
            <NavLink
                to={item.path}
                // Conditionally apply 'end' for exact matching, particularly for dashboard
                {...(item.id === 'dashboard' ? { end: true } : {})}
                className={({ isActive }) =>
                    `font-nunito flex items-center  border-b-2 border-[#f9f9f9] justify-between px-3 py-2.5 rounded-lg cursor-pointer group transition-all duration-150
           ${((isActive && !hasSubItems) || isConceptuallyActive) // Enhanced active state logic
                        ? 'bg-teal-800 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'}
           ${isBottom ? 'hover:bg-gray-50' : ''}`
                }
                target={item.path.startsWith('http') ? '_blank' : '_self'}
                rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                    if (item.path.startsWith('http')) {
                        // For external links, ensure navigation happens in new tab and prevent default react-router behavior
                        window.open(item.path, '_blank');
                        e.preventDefault();
                    } else if (hasSubItems) {
                        // For internal links with sub-items, toggle expansion
                        handleToggleExpansion(e);
                    }
                    // For internal links without sub-items, allow NavLink to navigate normally
                }}
            >
                <div className="flex items-center space-x-3">
                    <Icon size={20} className={((location.pathname === item.path && !hasSubItems) || isConceptuallyActive) ? 'text-white' : 'text-gray-500 group-hover:text-teal-700'} /> {/* Styling for icon */}
                    <span className="font-medium text-sm">{item.label}</span>
                </div>
                {hasSubItems && (
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 text-gray-400 ${isExpanded ? 'rotate-180' : ''} ${((location.pathname === item.path && !hasSubItems) || isConceptuallyActive) ? 'text-white' : 'text-gray-400 group-hover:text-blue-700'}`} // Styling for chevron
                        onClick={handleToggleExpansion} // Chevron click also toggles
                    />
                )}
            </NavLink>

            {/* Render sub-items if there are any and the parent is expanded or conceptually active */}
            {hasSubItems && (isExpanded || isConceptuallyActive) && ( // Render sub-items if expanded OR conceptually active
                <div className="ml-6 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                        <NavLink
                            key={subItem.id}
                            to={subItem.path}
                            className={({ isActive }) =>
                                `font-nunito  border-b-2 border-[#f9f9f9] flex items-center px-3 py-2 text-sm rounded-md cursor-pointer transition-colors duration-150
                ${isActive ? 'bg-t2 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                            }
                        >
                            {/* <div className="w-2 h-2 bg-teal-400 rounded-full mr-3" /> */}
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
    const [isConfirmPromptOpen, setIsConfirmPromptOpen] = useState(false);

    const handleLogout = useLogout();
    const user = useAuthStore((state) => state.user);


    // Function to open the logout confirmation dialog
    const handleConfirmationDialog = () => {
        setIsConfirmPromptOpen(true);
        setIsOpen(false); // Close sidebar on mobile when opening the modal
    }

    // Toggle the mobile sidebar open/closed state
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Overlay - appears when sidebar is open on small screens */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Mobile Menu Button (Hamburger/X icon) */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle Navigation"
            >
                {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>

            {/* Sidebar Container */}
            <div
                className={`overflow-auto h-[100dvh] bg-white shadow-xl
        fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-72 flex flex-col font-sans
      `}
            >
                {/* Header - Logo and App Name */}
                <div className="p-6 border-b border-gray-200 bg-action-button-gradient">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg flex items-center justify-center">
                            <img
                                src={kats_logo}
                                loading="lazy"
                                alt="kats_logo"
                                className="w-10 h-10 p-2 "
                            />
                        </div>
                        <div>
                            <h1 className="font-poppins text-2xl   font-bold text-white">
                                Kats
                            </h1>
                        </div>
                    </div>
                </div>
                {/* User Profile Section */}
                <div className="p-5 border-b border-gray-100 bg-background-grey">
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200`}
                        >
                            <img
                                src={user?.profilePic || default_profile} // Use user's profile pic from store, or default fallback
                                className="w-full h-full object-cover"
                                alt="User Profile"
                                loading="lazy"
                                onError={(e) => (e.target.src = default_profile)} // Fallback for image loading errors
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-base truncate">
                                {user?.company || 'Company Name'}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">
                                {`GSTIN - ${user?.gst}` || 'GSTIN - XXXXXXX...'} {/* Assuming email or another identifier exists */}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Area */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <MenuItem key={item.id} item={item} />
                        ))}
                    </div>
                </nav>

                {/* Bottom Section - Settings, Help, and Logout */}
             
                <div className="px-4 py-6 border-t border-gray-200 flex flex-col space-y-4 bg-background-grey">
                    {/* Other Bottom Menu Items */}
                    <div className="space-y-1">
                        {bottomMenuItems.map((item) => (
                            <MenuItem key={item.id} item={item} isBottom={true} />
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div onClick={handleConfirmationDialog} className="flex items-center px-3 py-2.5 rounded-lg  cursor-pointer bg-action-button-gradient hover:bg-t1 text-white transition-all duration-200">
                            <LogOut size={18} className="mr-3" />
                            <span className="font-medium text-sm">Logout</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* DeleteModal (Logout Confirmation) rendered directly within Sidebar */}

            <DeleteModal
                isOpen={isConfirmPromptOpen}
                onClose={() => setIsConfirmPromptOpen(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout? "
                confirmButtonText="Logout"
                cancelButtonText="cancel"
            // itemName={`Load ID: ${selectedValue?._id}`}
            />
        </>
    );
};



export default Sidebar; // Export App instead of Sidebar directly
