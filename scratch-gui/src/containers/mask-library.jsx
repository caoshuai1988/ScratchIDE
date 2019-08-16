import bindAll from 'lodash.bindall';
import {classNames, css} from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Modal from './modal.jsx';
import Spinner from '../components/spinner/spinner.jsx';
import Styles from '../components/library/library.css'
import WorkItem from '../components/work-item/work-item.jsx';

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

class MaskLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            visible: this.props.visible, // 是否显示，
            title: '发布作品',
            loaded: false, //加载状态
        }
        bindAll(this, []);
        this.styles = {
            mask: {
                padding: '25px 50px'
            },
            mask_container: {
                display: 'flex',
                justifyContent: 'space-between',
            },
            left_content: {
                flex: 1,
            },
            margin1rem: {
                marginTop: '1rem'
            },
            margin1_5rem: {
                marginTop: '1.5rem'
            },
            exend_code: {
                display: 'flex'
            },
            middle_content: {
                width: '3rem'
            },
            right_content: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            },
            covers: {
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem'
            },
            default_img: {
                width: '200px',
                height: '140px',
                background: '#BABABA',
            },
            bottom_content: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '80px'
            },
            button_item: {
                padding: '5px 20px',
                borderRadius: '10px',
                outline: '0 none'
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

    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.state.title}
                id='maskLibrary'
                modalType='mask'
                onRequestClose={this.props.onRequestClose}
            > 
                <div style={this.styles.mask}>
                    <div style={this.styles.mask_container}>
                        <div style={this.styles.left_content}>
                            <div>作品名称</div>
                            <div style={this.styles.margin1rem}>
                                <input style={{width: "100%", height:"2rem"}}  type="input" />
                            </div>
                            <div style={this.styles.margin1_5rem}>作品介绍与操作说明</div>
                            <div style={this.styles.margin1rem}>
                                <textarea style={{width:'100%'}} rows="10" />
                            </div>
                            <div style={this.styles.exend_code}>
                                <div>公开分享</div>
                                <div>允许查看源码</div>
                            </div>
                        </div>
                        <div style={this.styles.middle_content}></div>
                        <div style={this.styles.right_content}>
                            <div>作品封面</div>
                            <div style={this.styles.covers}>
                                <div style={this.styles.default_img}>
                                    图片1
                                </div>
                                <div style={this.styles.default_img}>
                                    图片2
                                </div>
                            </div>
                            <div style={this.styles.margin1_5rem}><input type="file" /></div>
                        </div>
                    </div>
                    <div style={this.styles.bottom_content}>
                        <div><button style={this.styles.button_item}>发布作品</button></div>
                        <div><button style={this.styles.button_item}>返回编辑</button></div>
                    </div>
                </div>
            </Modal>
        );
    }
}

MaskLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(MaskLibrary);
