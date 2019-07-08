import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ClassCropperModal from '../../components/class-cropper-modal/class-cropper-modal'
import { http } from'../../api/api'
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import './display.scss';
const tsIcon = require('../../images/dui.png')
const jia = require('../../images/add.png')
const bgc = require('../../images/bgc.jpg')
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 文件最大限制为5M

class Display extends Component {
  static propTypes= {
    classModalVisible: PropTypes.bool,
    classModalFile: PropTypes.bool,
    classResultImgUrl: PropTypes.string,
    title: PropTypes.string,
    choose: PropTypes.string,
    content: PropTypes.string,
    titleTxt:PropTypes.string,
    titleContent:PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      classModalVisible: false,
      classModalFile: null,
      classResultImgUrl: null,
      title: '',
      choose:'0',
      content:'',
      titleTxt:'无内容',
      titleContent: '无内容',
      url:'',
      id:'',
      base64:''
    }
  }

  componentDidMount () {
    //获取路由参数
    let urlRouter = this.props.location.search;
    let  theRequest = {};
    if (urlRouter.indexOf("?") !== -1) {
            let strs = urlRouter.substr(1);
            strs = strs.split("&");
            for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    this.setState({
      id : theRequest.id,
      url : theRequest.url
    });
  }

  handleChange= (event) =>{
      this.setState({
        title: event.target.value
      })
  }

  allContent= (event) =>{
    this.setState({
      content: event.target.value
    })
  }

  checkboxOption= (event) =>{
      this.setState({
        choose:event.target.value
      });
  }

  dataURLtoFile=(dataurl, filename) =>{//将base64转换为文件
    console.log(dataurl,'-=-=-=-')
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  newPage= () =>{
    window.open(`http://127.0.0.1:8601?type=3&autoPlay=1&url=${this.state.url}`)
  }

  submitAll = () =>{
    if(this.state.content ===''){
      this.info()
      return
    }
    if(this.state.title ===''){
      this.setState({
        titleTxt : '无标题',
        titleContent : '请输入标题'
      });
      this.info()
      return
    }
    if(this.state.classResultImgUrl ===null){
      this.setState({
        titleTxt : '无封面图片',
        titleContent : '请上传封面图片'
      });
      this.info()
      return
    }
    // let _this = this
    // let filedata = ''
    // let dataurl = ''
    // let reader = new FileReader();
    // reader.readAsDataURL(this.state.classModalFile);
    // reader.onload = function (e){ 
    //     //  filedata= this.result.substring(this.result.indexOf(',')+1);
    //      filedata= this.result;
    //      console.log(filedata,'-=-=-=-')
    //      dataurl =  this.result.substring;
    //      let a = _this.dataURLtoFile(filedata)
    //      console.log(a,'-=-=-')
    // }

    http.post('http://kejiadmin.qbitai.com/index.php?r=publish/preview',{
      file:this.state.classModalFile,
      id:this.state.id,
      classResultImgUrl: this.state.classResultImgUrl,
      title: this.state.title,
      choose:this.state.choose,
      content:this.state.content,
    },).then(
        data => {
          this.props.history.push( `/showVideo/${this.state.url}`)
        }
      )
    .catch(err => console.log(err)) 
  }

  info =() => {
    Modal.info({
      title: this.state.titleTxt,
      content: (
        <div>
          <p>{this.state.titleContent}</p>
        </div>
      ),
      onOk() {},
    });
  }

  handleClassFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        this.setState(
          {
            classModalFile: file // 先把上传的文件暂存在state中
          },
          () => {
            this.setState({
              classModalVisible: true // 然后弹出modal
            })
          }
        )
      } else {
        console.log('文件过大')
      }
    }
  }

  handleGetResultImgUrl = key => blob => {
    const str = URL.createObjectURL(blob)
    this.setState({
      [key]: str
    })
  }

  render() {
    const {
      classModalVisible,
      classModalFile,
      classResultImgUrl
    } = this.state
    return (
      <div className="content" >
        <img src={bgc} alt=""style={{width:'100%',height:'100%'}}  />
          <div className="con-box">
              <span className="fa">发布作品</span>
              <div className="line"></div>
              <div className="flex-box">
                <div className="production">
                  <div className="zuo">作品名称</div>
                  <input type="text" className="inputText"  name='title' value={this.state.title}  onChange={this.handleChange} />
                  <div className="explain">作品介绍与操作说明</div>
                  <textarea  id="" cols="30" rows="10" className="textAll" placeholder="这里可以向大家介绍你的作品～" name='content' value={this.state.content}  onChange={this.allContent} ></textarea>
                  <div className="select">
                    <label className="left">
                        <input type="checkbox" className="hidden-input" name='choose'  value='0' onChange={this.checkboxOption}/>
                        <span className="your style about checkbox" ></span>
                        {this.state.choose ==='0' ? <img src={tsIcon} className="dui" alt=""/> : ''}
                    </label>
                    <div className="share">公开分享</div>

                    <label className="left">
                        <input type="checkbox" className="hidden-input" name='choose' value='1'  onChange={this.checkboxOption}/>
                        <span className="your style about checkbox"></span>
                        {this.state.choose=== '1' ? <img src={tsIcon} className="dui" alt=""/> : ''}
                    </label>
                    <div className="share">允许查看源代码</div>
                  </div>
                </div>
                <div className="cover">
                  <div className="zuo">作品封面</div>
                  <div className="imgAll">
                    {/* <img className="imageWh" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561543101261&di=9e8f50486a2ab5d4c527800b3e224fbf&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fwap720%2F006JOJQuly1fsqmtu4fckj31bg0qoaf5.jpg" alt=""/>
                    <img className="imageWh" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561543101261&di=9e8f50486a2ab5d4c527800b3e224fbf&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fwap720%2F006JOJQuly1fsqmtu4fckj31bg0qoaf5.jpg" alt=""/>
                    <img className="imageWh" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561543101261&di=9e8f50486a2ab5d4c527800b3e224fbf&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fwap720%2F006JOJQuly1fsqmtu4fckj31bg0qoaf5.jpg" alt=""/> */}
                    {classResultImgUrl ?
                      <div className="img-container">
                      {classResultImgUrl && (
                        <img
                          className="img"
                          src={classResultImgUrl}
                          alt="classResultImgUrl"
                        />
                      )}
                     </div>  :''
                    } 
                    <div className="jia">
                    <img src={jia} alt="" className="fuhao"/>

                    <div className="app">
                          <div className="half-area">
                            <label className="upload-input-label">
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                className="base-upload-input"
                                onChange={this.handleClassFileChange}
                              />
                            </label>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
     
          <div className="btn">
              {classModalVisible && (
              <ClassCropperModal
                uploadedImageFile={classModalFile}
                onClose={() => {
                  this.setState({ classModalVisible: false })
                }}
                onSubmit={this.handleGetResultImgUrl('classResultImgUrl')}
              />
            )}
            <button className="buttom" onClick={this.submitAll}><span>提交作品</span></button>
            <button className="right-btn buttom isShow" onClick={this.newPage}><span>返回编辑</span></button>
          </div>
      </div>
    );
  }
}

export default Display;
