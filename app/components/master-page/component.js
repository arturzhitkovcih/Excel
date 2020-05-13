import React from 'react';
import NavLink from 'react-router-dom/NavLink';

import routes from 'common/routes';

import './index.scss';

class MasterPage extends React.PureComponent {
    getClassNames = () => {
        return {
            header: 'header',
            link: 'header__link'
        };
    };

    render() {
        const classNames = this.getClassNames();

        return (
            <>
                <div className={classNames.header}>
                    <NavLink exact to={routes.home} className={classNames.link} activeClassName="selected">
                        Employee
                    </NavLink>

                    <NavLink exact to={routes.tags} className={classNames.link} activeClassName="selected">
                        Tags
                    </NavLink>

                    <NavLink exact to={routes.positions} className={classNames.link} activeClassName="selected">
                        Employee Positions
                    </NavLink>

                    <NavLink exact to={routes.employeeStates} className={classNames.link} activeClassName="selected">
                        Employee States
                    </NavLink>
                </div>
                {this.props.children}
            </>
        );
    }
}

export default MasterPage;
