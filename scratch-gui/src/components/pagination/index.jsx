import React from 'react';
import 'rc-pagination/dist/rc-pagination.min.css';
import RcPagination from 'rc-pagination';
import styles from './index.css';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

// 通用分页组件
class Pagination extends React.PureComponent {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className={styles.pageContaier}>
                <div className={styles.pageItem}>
                    <RcPagination {...this.props} 
                    hideOnSinglePage
                    showQuickJumper />
                </div>
            </div>
        )
    }
}

export default Pagination
