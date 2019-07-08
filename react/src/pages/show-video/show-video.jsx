import React, { Component } from 'react';
import './show-video.scss';
// import ShowVideos from '../../components/show-videos/show-video'
const zan = require('../../images/keji_CKZP_like.png')
const yaun = require('../../images/keji_CKZP_look.png')
const bgc = require('../../images/bgc.jpg')

class ShowVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url:'',
    }
  }

  componentDidMount(){
    this.setState({
      url: this.props.location.pathname.substring(11)
    })
  }
  
  all = () => {
    window.open(`http://127.0.0.1:8601?type=3&autoPlay=1&url=${this.state.url}`)
  }

  render() {
    return (
        <div className="content">
           <img src={bgc} alt=""style={{width:'100%',height:'100%'}}  /> 
           <iframe 
              ref="iframe" 
              src="http://127.0.0.1:8601/"
              // src="http://62.234.167.195:8601/"
              scrolling="no" 
              frameBorder="0"
              width="100%" 
              height="100%"
              title="scratch"
                >
          </iframe> 
           {/* <ShowVideos /> */}
           <div className="con-box">
           
              <div className="tou">
                <img className="pru" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561543101261&di=9e8f50486a2ab5d4c527800b3e224fbf&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fwap720%2F006JOJQuly1fsqmtu4fckj31bg0qoaf5.jpg" alt=""/>
                <span className="fa">布作品</span>
              </div>
              <div className="flex-box">
                <div className="left">
                  <div className="video">
                      <div className="title">
                        <div className="text">若谷的家</div>
                        <div>
                          <span className="textList">102次浏览</span>
                          <span className="textList">|</span>
                          <span className="textList">发布于2019.06.24</span>
                        </div>
                      </div>
                      
                  </div>

                </div>
                <div className="right">
                  <div className="cao">作品介绍与操作说明</div>
                  <div className="textAll">绍作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品介绍作品</div>
                  <div className="cao">艾伦老师点评</div>
                  <div className="teacher">很有创新点，继续加油</div>
                  <div className="line"></div>
                  <div className="zan">
                    <div className="zanAll">
                      <img src={zan} alt="" className="zans"/>
                      <div className="zanNum">
                        <span>点赞</span>
                        023次
                      </div>
                    </div>
                    <div className="yuanAll" onClick={this.all}>
                      <img src={yaun} alt="" className="yuans"/>
                      <span className="cha" >查看源码</span>
                    </div>
                  </div>
                </div>
              </div>
           </div>
         </div>
    );
  }
}

export default ShowVideo;
