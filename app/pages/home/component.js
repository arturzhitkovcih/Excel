import React from 'react';

import './index.scss';

const baseClassName = 'home-page';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            header: `${baseClassName}__header`
        };
    };

    render() {
        const classNames = this.getClassNames();

        return (
            <div className={classNames.component}>
                Excel
            </div>
        );
    }
}

export default HomePage;
