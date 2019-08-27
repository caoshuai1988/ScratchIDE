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
            pageNum: 1
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
        // Allow the spinner to display before loading the content
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
        return  [{
            imgSrc: 'https://mmbiz.qlogo.cn/mmbiz/Mo21APPFBgXibzXsuzdVibpQhicmBBW5sVvJficN7NulwGW2gibbsMEoOHUL4eEjRvVicPiaLia28FTVG8Atdx2mDFhCGw/0?wx_fmt=jpeg',
            title: '我爱北京天安门',
            date: '5月23日18：29'
        },{
            imgSrc: 'https://mmbiz.qlogo.cn/mmbiz/Mo21APPFBgXibzXsuzdVibpQhicmBBW5sVvJficN7NulwGW2gibbsMEoOHUL4eEjRvVicPiaLia28FTVG8Atdx2mDFhCGw/0?wx_fmt=jpeg',
            title: '我爱北京天安门',
            date: '5月23日18：29'
        },{
            imgSrc: 'https://mmbiz.qlogo.cn/mmbiz/Mo21APPFBgXibzXsuzdVibpQhicmBBW5sVvJficN7NulwGW2gibbsMEoOHUL4eEjRvVicPiaLia28FTVG8Atdx2mDFhCGw/0?wx_fmt=jpeg',
            title: '我爱北京天安门',
            date: '5月23日18：29'
        },{
            imgSrc: 'https://mmbiz.qlogo.cn/mmbiz/Mo21APPFBgXibzXsuzdVibpQhicmBBW5sVvJficN7NulwGW2gibbsMEoOHUL4eEjRvVicPiaLia28FTVG8Atdx2mDFhCGw/0?wx_fmt=jpeg',
            title: '我爱北京天安门',
            date: '5月23日18：29'
        },{
            imgSrc: 'https://mmbiz.qlogo.cn/mmbiz/Mo21APPFBgXibzXsuzdVibpQhicmBBW5sVvJficN7NulwGW2gibbsMEoOHUL4eEjRvVicPiaLia28FTVG8Atdx2mDFhCGw/0?wx_fmt=jpeg',
            title: '我爱北京天安门',
            date: '5月23日18：29'
        }]
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
                    {this.state.loaded ? this.getCloudData().map((item, index) => (
                        <WorkItem key={index} workItem={item} />
                        // <div
                        // className={[this.styles.libraryItem_library, this.styles.llibraryItem_featured]}
                        // id={index}
                        // key={`item_${index}`}
                        // >
                        //     <div>
                        //         <img src={item.src} />
                        //     </div>
                        //     <div>{item.title}</div>
                        //     <div>{item.date}</div>
                        // </div> 
                    )) : (
                        <div className={Styles.spinnerWrapper}>
                            <Spinner
                                large
                                level="primary"
                            />
                        </div>
                    )}
                </div>
                <Pagination current={11} total={200} onChange={(pageNum) => console.log(pageNum)} />
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
