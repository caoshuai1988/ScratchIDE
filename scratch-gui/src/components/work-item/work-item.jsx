import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './work-item.css';
import classNames from 'classnames';



class WorkItemComponent extends React.PureComponent {


    render () {
        return (<div
            className={classNames(
                styles.libraryItem,
                styles.featuredItem,
                styles.libraryItemExtension,
            )}
            onClick={()=>this.props.handleLoadWork(this.props.workItem.file_url)}
        >
            <div className={styles.featuredImageContainer}>
                <img
                    className={styles.featuredImage}
                    src={this.props.workItem.img}
                />
            </div>
            <div
                className={classNames(styles.featuredExtensionText, styles.featuredText)
                }
            >
                <span className={styles.libraryItemName}>{this.props.workItem.title}</span>
                <br />
                <span className={styles.featuredDescription}>{this.props.workItem.update_at}</span>
            </div>
        </div>
        )
    }
}

export default WorkItemComponent;
