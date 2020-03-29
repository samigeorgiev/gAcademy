import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth';

const Tmp = props => {
    const { logOut } = useContext(AuthContext);

    return <button onClick={logOut}>Log out</button>;
};

export default Tmp;
