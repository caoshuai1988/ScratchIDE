import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import LibraryItem from '../../containers/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import Spinner from '../spinner/spinner.jsx';

import styles from './library.css';

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    }
});

const ALL_TAG = {tag: 'all', intlLabel: messages.allTag};
const tagListPrefix = [ALL_TAG];

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'handleTagClick',
            'setFilteredDataRef'
        ]);
        this.state = {
            selectedItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag,
            loaded: false
        };
    }
    componentDidMount () {
        // Allow the spinner to display before loading the content
        setTimeout(() => {
            this.setState({loaded: true});
        });
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
    }
    handleSelect (id) {
        this.handleClose();
        this.props.onItemSelected(this.getFilteredData()[id]);
    }
    handleClose () {
        this.props.onRequestClose();
    }
    handleTagClick (tag) {
        this.setState({
            filterQuery: '',
            selectedTag: tag.toLowerCase()
        });
    }
    handleMouseEnter (id) {
        if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.getFilteredData()[id]);
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.getFilteredData()[id]);
    }
    handleFilterChange (event) {
        this.setState({
            filterQuery: event.target.value,
            selectedTag: ALL_TAG.tag
        });
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
        let sourceList = this.props.data
        let externalList = [
            {
              "name": "飞行器",
              "md5": "fd2a6dfcd9e7200871e6ad9cf5cb79f0",
              "poster": "https://course-1259411883.cos.ap-beijing.myqcloud.com/Course/fd2a6dfcd9e7200871e6ad9cf5cb79f0.png",
              "type": "keji",
              "tags": [
                "素材奖励活动",
                "奖励",
                "keji"
              ],
              "info": [
                0.5
              ],
              "json": {
                "objName": "飞行器",
                "costumes": [
                  {
                    "costumeName": "飞行器",
                    "baseLayerID:": -1,
                    "baseLayerMD5": "fd2a6dfcd9e7200871e6ad9cf5cb79f0",
                    "bitmapResolution": 1
                  }
                ],
                "currentCostumeIndex": 0,
                "scale": 1,
                "direction": 90,
                "rotationStyle": "normal",
                "isDraggable": false,
                "visible": true,
                "spriteInfo": {}
              },
              "extra": {
                "enabled": true,
                "message": "",
                "detail": "",
                "preview": ""
              }
            },
            {
              "name": "空间站",
              "md5": "9a8bc0513e84387dfa437fda398471fc",
              "poster": "https://course-1259411883.cos.ap-beijing.myqcloud.com/Course/9a8bc0513e84387dfa437fda398471fc.png",
              "type": "keji",
              "tags": [
                "素材奖励活动",
                "奖励",
                "keji"
              ],
              "info": [
                0.5
              ],
              "json": {
                "objName": "空间站",
                "costumes": [
                  {
                    "costumeName": "空间站",
                    "baseLayerID:": -1,
                    "baseLayerMD5": "9a8bc0513e84387dfa437fda398471fc",
                    "bitmapResolution": 1
                  }
                ],
                "currentCostumeIndex": 0,
                "scale": 1,
                "direction": 90,
                "rotationStyle": "normal",
                "isDraggable": false,
                "visible": true,
                "spriteInfo": {}
              },
              "extra": {
                "enabled": false,
                "message": "",
                "detail": "",
                "preview": ""
              }
            }
          ]

        sourceList = sourceList.concat(externalList)
        if (this.state.selectedTag === 'all') {
            if (!this.state.filterQuery) return sourceList;
            return sourceList.filter(dataItem => (
                (dataItem.tags || [])
                    // Second argument to map sets `this`
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    .concat(dataItem.name ?
                        (typeof dataItem.name === 'string' ?
                        // Use the name if it is a string, else use formatMessage to get the translated name
                            dataItem.name : this.props.intl.formatMessage(dataItem.name.props)
                        ).toLowerCase() :
                        null)
                    .join('\n') // unlikely to partially match newlines
                    .indexOf(this.state.filterQuery.toLowerCase()) !== -1
            ));
        }
        return sourceList.filter(dataItem => (
            dataItem.tags &&
            dataItem.tags
            .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
            .indexOf(this.state.selectedTag) !== -1
        ));
    }
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }
    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
            >
                {(this.props.filterable || this.props.tags) && (
                    <div className={styles.filterBar}>
                        {this.props.filterable && (
                            <Filter
                                className={classNames(
                                    styles.filterBarItem,
                                    styles.filter
                                )}
                                filterQuery={this.state.filterQuery}
                                inputClassName={styles.filterInput}
                                placeholderText={this.props.intl.formatMessage(messages.filterPlaceholder)}
                                onChange={this.handleFilterChange}
                                onClear={this.handleFilterClear}
                            />
                        )}
                        {this.props.filterable && this.props.tags && (
                            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
                        )}
                        {this.props.tags &&
                            <div className={styles.tagWrapper}>
                                {tagListPrefix.concat(this.props.tags).map((tagProps, id) => (
                                    <TagButton
                                        active={this.state.selectedTag === tagProps.tag.toLowerCase()}
                                        className={classNames(
                                            styles.filterBarItem,
                                            styles.tagButton,
                                            tagProps.className
                                        )}
                                        key={`tag-button-${id}`}
                                        onClick={this.handleTagClick}
                                        {...tagProps}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                )}
                <div
                    className={classNames(styles.libraryScrollGrid, {
                        [styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    {this.state.loaded ? this.getFilteredData().map((dataItem, index) => (
                        <LibraryItem
                            bluetoothRequired={dataItem.bluetoothRequired}
                            collaborator={dataItem.collaborator}
                            description={dataItem.description}
                            disabled={dataItem.disabled}
                            extensionId={dataItem.extensionId}
                            featured={dataItem.featured}
                            hidden={dataItem.hidden}
                            iconMd5={dataItem.md5}
                            iconType={dataItem.type}
                            iconRawURL={dataItem.poster}
                            icons={dataItem.json && dataItem.json.costumes}
                            id={index}
                            insetIconURL={dataItem.insetIconURL}
                            internetConnectionRequired={dataItem.internetConnectionRequired}
                            key={`item_${index}`}
                            name={dataItem.name}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            onSelect={this.handleSelect}
                        />
                    )) : (
                        <div className={styles.spinnerWrapper}>
                            <Spinner
                                large
                                level="primary"
                            />
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

LibraryComponent.propTypes = {
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]),
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true
};

export default injectIntl(LibraryComponent);
