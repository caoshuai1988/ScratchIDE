import bindAll from 'lodash.bindall';
import {classNames, css} from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Modal from './modal.jsx';
import WorkPlayer from '../components/kejicode/work-player/work-player.jsx'

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

class PlayerLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            visible: this.props.visible, // 是否显示，
            title: '作品详情',
            loaded: false, //加载状态
        }
        bindAll(this, []);
    }

    componentDidMount () {
        // this.getDefaulgtCover()
        // setTimeout(() => {
        //     this.setState({loaded: true})
        // });
    }
      /*获取发布页面默认封面图 */
      getDefaulgtCover() {
        let _this = this
        const url = 'https://kejiapi.qbitai.com/v1/scratch/publish-cover.html'
        fetch(url,{
            method:'GET'
        }).then((res)=>{
            return res.text()
        }).then((response)=>{
            let res = JSON.parse(response)
            if(res.error === 0) {
                _this.setState({
                    defCover: res.data
                })
            }else {
                alert(res.msg)
            }
        })
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
            <WorkPlayer closeModal={this.props.onRequestClose}/>
            </Modal>
        );
    }
}

PlayerLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(PlayerLibrary);
