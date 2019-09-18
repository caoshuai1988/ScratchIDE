import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import React from 'react';
import styles from './publish-works.css';
import classNames from 'classnames';
import publishWork from '../../../lib/publish-work';
import {setOnlyPlayer} from '../../../reducers/only-player';
import {setPlayer} from '../../../reducers/mode';
import {saveWorkInfo} from '../../../reducers/work-info';

class PublishWorks extends React.PureComponent {
    constructor(props){
        super(props)
        bindAll(this, [
            'deleteSelPic',
            'utilDataURItoBlob',
            'handlePublishWork'
        ]);
        this.state = {
            defCover: [],
            selCover: '', //选择上传封面url
            nameRemai: 30, //名称剩余字数
            contentRemai: 500, //内容剩余字数
            disabled: false, //默认封面是否禁用
            selDefCover: 'https://scratch-1259411883.cos.ap-beijing.myqcloud.com/cover20190725112127.png', //选中默认封面的值
            isShare: false, //是否公开分享
            isCode: false, // 是否开源代码
            selFile: '', //上传图片流
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.defCover !== this.state.defCover) {
            this.setState({
                defCover: nextProps.defCover
            })
        }
    }

    deleteSelPic() {
        this.setState({
            selCover: '',
            disabled: false
        })
    }

    calcuRemain(event, maxNum) {
        let curNum = event.target.value.length;
        if(curNum <= maxNum){
            let result = maxNum-curNum
            if(maxNum === 30){
                this.setState({
                    nameRemai: result
                })
            }else if(maxNum === 500) {
                this.setState({
                    contentRemai: result
                })
            }
        }
        return false
    }

    changeImgCover(url){
        if(!this.state.disabled){
            this.setState({
                selDefCover: url.target.src
            })
        }
    }
    
    //工具方法转Blob
    utilDataURItoBlob (dataURI){
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }
    //发布作品
    handlePublishWork() {
        let defCover = !this.state.disabled? this.state.selDefCover: '';
        let work = {
            fileName: this.name.value+ '.sb3',
            details: this.intro.value,
            status: this.state.isShare? 1: 2,
            source_code: this.state.isCode? 1: 2,
            img_url: defCover,
            imgdata: this.state.selFile,
        }
       
        this.props.saveProjectSb3().then(content => {
            let _this = this;
            publishWork(work, content, _this.props)
        }).then((obj)=>{
            // console.log(JSON.stringify(obj))
            this.props.closeModal()
            this.props.onSetOnlyPlayer(true)
            this.props.onSeeCommunity()
        });
    }

    render () {
        return (<div className={styles.mask}>
            <div className={styles.mask_container}>
                <div className={styles.left_content}>
                    <div className={styles.work_item }>
                        <div>作品名称</div>
                        <div>{this.state.nameRemai}</div>
                    </div>
                    <div className={styles.margin1rem}>
                        <input ref={name => this.name = name}  onChange={(e)=>this.calcuRemain(e, 30)} className={styles.work_input}  type="input" maxLength="30" />
                    </div>
                    <div className={classNames(styles.margin1_5rem, styles.work_item)}>
                        <div>作品介绍与操作说明</div>
                        <div>{this.state.contentRemai}</div>
                    </div>
                    <div className={styles.margin1rem}>
                        <textarea ref={intro => this.intro = intro} onChange={(e)=>this.calcuRemain(e, 500)} className={styles.work_textarea} 
                        placeholder="这里可以向大家介绍你的作品～&#10;教教大家你的作品是如何操作的吧～" rows="10" />
                    </div>
                    <div className={styles.exend_code}>
                        <div className={styles.flexContainer} style={{width:144}}> <input type="checkbox" onChange={()=>{
                            this.setState({
                                isShare: !this.state.isShare
                            })
                        }}/>公开分享</div>
                        <div className={styles.flexContainer}> <input type="checkbox" onChange={()=>{
                            this.setState({
                                isCode: !this.state.isCode
                            })
                        }}/>允许查看源码</div>
                    </div>
                </div>
                <div className={styles.middle_content}></div>
                <div className={styles.right_content}>
                    <div>作品封面</div>
                    <div className={styles.covers} >
                        {this.state.defCover.length > 0 ? this.state.defCover.map((item, index)=>{
                        return <div key={index}>
                                <div className={styles.default_img}>
                                    <img height="100%"  src={item} value={item}  onClick={(item)=>this.changeImgCover(item)}/>
                                    {this.state.selDefCover === item? <div className={styles.selMask}>
                                        <div className={styles.circleCheck}>
                                            <div className={styles.draw}></div>
                                        </div>
                                    </div> : null}
                                </div>
                            </div>
                        }): null}
                    </div>
                    <div className={styles.margin1_5rem}>
                        {this.state.selCover===''?
                            <a className={styles.btn_addPic} href="javascript:void(0);">
                            <span className={styles.addPic_span}>
                            <em className={styles.addPic_em}>+</em>添加封面</span>
                            <input onChange={(e)=>{
                                let _this = this
                                let selImg = e.target.files[0]
                                let url = window.url || window.webkitURL
                                let selSrc = url.createObjectURL(selImg)
                                let reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0])
                                reader.onload = function(){
                                    _this.setState({
                                        selFile: selImg,
                                    })
                                }
                                this.setState({
                                    selCover: selSrc,
                                    disabled: true,
                                    selDefCover: ''
                                })
                            }} className={styles.filePrew} title="支持jpg、jpeg、gif、png格式，文件小于5M" 
                                tabIndex="3" type="file" size="3" name="pic" />
                        </a>: <div className={styles.selPic_item}>
                           <div className={styles.delPic_item} onClick={this.deleteSelPic}>删除</div>
                           <img height="100%" src={this.state.selCover} />
                           <div className={styles.selMask}>
                            <div className={styles.circleCheck}>
                                <div className={styles.draw}></div>
                            </div>
                        </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.bottom_content}>
                <div style={{marginRight:24}}><button className={styles.button_item} onClick={
                    this.props.closeModal
                }>返回编辑</button></div>
                <div>
                    { this.state.nameRemai < 30 ?
                    <button className={classNames(styles.button_item, styles.button_commit)} 
                    onClick={this.handlePublishWork}>发布作品</button>: 
                    <button className={styles.button_item}>发布作品</button>
                    }
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
});

const mapDispatchToProps = dispatch => ({
    onSetOnlyPlayer: onlyPlayer => dispatch(setOnlyPlayer(onlyPlayer)),
    onSeeCommunity: () => dispatch(setPlayer(true)),
    onSavePrograWorkInfo: workInfo => dispatch(saveWorkInfo(workInfo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublishWorks);