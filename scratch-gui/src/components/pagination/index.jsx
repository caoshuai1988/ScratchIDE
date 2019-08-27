import React from 'react';
import 'rc-pagination/dist/rc-pagination.min.css';
import RcPagination from 'rc-pagination';
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
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props} 
                    hideOnSinglePage
                    showQuickJumper />
                </div>
            </div>
        )
    }
}

export default Pagination
