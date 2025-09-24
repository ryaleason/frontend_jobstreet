import React, { useContext, useState } from 'react';
import {
  LayoutDashboard,
  Search,
  Briefcase,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  Heart,
  MessageSquare,
  Building2,
  TrendingUp,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);
  const {user,logout} = useContext(AuthContext) ;
  const navigate = useNavigate();
  const {id} = useParams();
  

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard/perusahaan'
    },
    {
      id: 'job-search',
      label: 'Job Search',
      icon: Search,
      path: '/jobs',
      subItems: [
        { id: 'browse-jobs', label: 'Browse Jobs', icon: Briefcase },
        { id: 'saved-jobs', label: 'Saved Jobs', icon: Heart },
        { id: 'job-alerts', label: 'Job Alerts', icon: Bell }
      ]
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: FileText,
      path: '/applications',
      badge: '12',
      subItems: [
        { id: 'active-applications', label: 'Active', icon: TrendingUp },
        { id: 'draft-applications', label: 'Drafts', icon: FileText },
        { id: 'interview-schedule', label: 'Interviews', icon: Calendar }
      ]
    },
    {
      id: 'companies',
      label: 'Companies',
      icon: Building2,
      path: '/companies'
    },
    {
      id: 'networking',
      label: 'Networking',
      icon: Users,
      path: '/networking'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/messages',
      badge: '3'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: `/user/profile/${user.id}`
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings'
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      path: {logout}
    }
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedSubMenu(expandedSubMenu === menuId ? null : menuId);
  };

  const MenuItem = ({ item, isSubItem = false }) => {
    const Icon = item.icon;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedSubMenu === item.id;
     const isActive = location.pathname.startsWith(item.path);

    return (
      <div className="mb-1">
        <div
          className={`
            flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
            ${isActive 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }
            ${isSubItem ? 'ml-6 py-2' : ''}
          `}
          onClick={() => {
            if(item.id === "logout"){
              logout();
              return
            }
            if (hasSubItems) {
              toggleSubmenu(item.id);
            } else {
              setActiveMenu(item.id);
              if (item.path) {
                
                navigate(item.path);
              }
            }
          }}
        >
          <Icon 
            size={isCollapsed ? 20 : 18} 
            className={`
              ${isCollapsed ? 'mx-auto' : 'mr-3'} 
              ${isActive ? 'text-white' : 'text-gray-500'}
              transition-colors duration-200
            `} 
          />
          
          {!isCollapsed && (
            <>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              
              {hasSubItems && (
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Submenu */}
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <MenuItem key={subItem.id} item={subItem} isSubItem={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`
      bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
      h-screen flex flex-col
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase size={18} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">JobSeeker</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isCollapsed ? (
              <Menu size={18} className="text-gray-600" />
            ) : (
              <X size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{user.nama}</p>
              <p className="text-sm text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        {bottomMenuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-400">Created By Ryaleason</p>
            <p className="text-xs text-gray-400 mt-1">Version 2.1.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;