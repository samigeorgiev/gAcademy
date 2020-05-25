import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

import { AuthenticationContext } from '../../../../context/authentication';

import profile from '../../../../images/tmp/profile.png';

const Account = props => {
    const history = useHistory();

    const { user, logOut } = useContext(AuthenticationContext);

    return (
        <Dropdown
            item
            direction="left"
            icon={<Image avatar size="mini" src={profile} />}
            style={{ background: 'none' }}
        >
            <Dropdown.Menu>
                {user.isTeacher ? (
                    <Dropdown.Item
                        onClick={() => history.push('/teacher-panel')}
                    >
                        Teacher panel
                    </Dropdown.Item>
                ) : (
                    <Dropdown.Item onClick={props.showBecomeTeacher}>
                        Become teacher
                    </Dropdown.Item>
                )}
                <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Account;
