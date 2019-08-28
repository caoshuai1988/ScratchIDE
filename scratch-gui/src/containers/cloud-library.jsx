import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl'
import Modal from './modal.jsx'
import Spinner from '../components/spinner/spinner.jsx'
import Styles from '../components/library/library.css'
import WorkItem from '../components/work-item/work-item.jsx'
import Pagination from '../components/pagination/index.jsx'


const messages = defineMessages({
    // extensionTitle: {
    //     defaultMessage: 'Choose an Extension',
    //     description: 'Heading for the extension library',
    //     id: 'gui.extensionLibrary.chooseAnExtension'
    // },
    // extensionUrl: {
    //     defaultMessage: 'Enter the URL of the extension',
    //     description: 'Prompt for unoffical extension url',
    //     id: 'gui.extensionLibrary.extensionUrl'
    // }
});

class CloudLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            cloudLibraryData: [], // 云端作品数据
            visible: this.props.visible, // 是否显示，
            title: '云端保存的作品',
            loaded: false, //加载状态
            pageNum: 1, // 当前页
            total: 0, // 总条数
            pageSize: 1, //每页显示条数
        }
        bindAll(this, [
            'handleItemSelect',
            'getCloudData'
        ]);
        this.styles = {
            llibraryItem_featured: {
                flexBasis: '300px',
                maxWidth: '300px',
                height: 'auto',
                overflow: 'hidden',
                padding: 0
            },
            libraryItem_library: {
                alignSelf: 'stretch',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: '0.5rem',
                background: 'white',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'hsla(0, 0%, 0%, 0.15)',
                borderRadius: '0.5rem',
                textAlign: 'center',
                cursor: 'pointer'
            }
        }
    }

    componentDidMount () {
        this.getCloudData()
        setTimeout(() => {
            this.setState({loaded: true});
        });
    }

    handleItemSelect (item) {
        const id = item.extensionId;
        let url = item.extensionURL ? item.extensionURL : id;
        if (!item.disabled && !id) {
            url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
        }
        if (id && !item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                this.props.onCategorySelected(id);
            } else {
                this.props.vm.extensionManager.loadExtensionURL(url).then(() => {
                    this.props.onCategorySelected(id);
                });
            }
        }
    }
    getCloudData () {
        let _this = this
        const url = 'https://kejiapi.qbitai.com/v1/scratch/cloud.html?page='+this.state.pageNum+'&page_size='+ this.state.pageSize
        fetch(url,{
            method:'GET',
        }).then((res)=>{
            return res.text()
        }).then((res)=>{
            let response = JSON.parse(res)
            if(response.error === 0) {
               _this.setState({
                cloudLibraryData: response.data.list,
                total: parseInt(response.data.count)
               })
            }else {
                alert(res.msg)
            }
        })
    }

    jumpPageWork (page) {
        this.setState({
            pageNum: page
        }, function(){
            this.getCloudData()
        })
    }

    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.state.title}
                id='cloudLibrary'
                onRequestClose={this.props.onRequestClose}
            > 
             {/**TODO 填充选择作品层数据 */}
                <div
                    className={classNames(Styles.libraryScrollGrid, {
                        [Styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    {this.state.cloudLibraryData.length > 0 ? this.state.cloudLibraryData.map((item, index) => (
                        <WorkItem key={index} workItem={item} />
                    )) : (
                        <div className={Styles.spinnerWrapper}>
                            <Spinner
                                large
                                level="primary"
                            />
                        </div>
                    )}
                </div>
                <Pagination current={this.state.pageNum} pageSize={this.state.pageSize} total={this.state.total} onChange={(pageNum) => this.jumpPageWork(pageNum)} />
            </Modal>
        );
    }
}

CloudLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(CloudLibrary);
