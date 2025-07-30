import { memo } from 'react';
import Sidebar from '../components/layout/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import SessionWrapper from '../components/common/SessionWrapper';

const Profile = () => {

  return (
    <SessionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-[max-content,_1fr] min-h-[100dvh] overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </SessionWrapper>
  );
};

export default memo(Profile);
