import { Outlet } from 'react-router-dom';
import { memo } from 'react';



const  RC = ()=>{
    return (
        <Outlet />
    )
}
export default memo(RC);