import React from 'react';

const RequireRole = ({ user, allowedRoles, children }) => {
    if (!user || !allowedRoles.includes(user.role)) {
        return <div className="text-red-600 p-4">Access Denied</div>;
    }
    return children;
};

export default RequireRole;