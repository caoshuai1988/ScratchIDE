import React, { Component } from 'react';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import './video.scss';

const bgc = require('../../images/sidebar_on.png')
const homeIcon = require('../../images/home_icon.png')
const videoIcon = require('../../images/video_icon.png')
const workIcon = require('../../images/work_icon.png')
const answerIcon = require('../../images/answer_icon.png')
const homeIconBg = require('../../images/home_icon_bg.png')
const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};

class video extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      videos :require('../../images/a.mp4'),
      dongStyle:{
          width:'220px',
          transition:`width 1s linear 0s`
      },
      iconStyle:{
          icon:require('../../images/off_icon.png'),
          width:'26px',
          height:'26px',
          position: 'absolute',
          left: '166px',
          bottom: '162px',
      },
      source: sources.bunnyMovie
    };
    // console.log(this.play.bind(this),'-=-=-=');

    // this.play = this.play.bind(this);
    // this.pause = this.pause.bind(this);
    // this.load = this.load.bind(this);
    // this.changeCurrentTime = this.changeCurrentTime.bind(this);
    // this.seek = this.seek.bind(this);
    // this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    // this.changeVolume = this.changeVolume.bind(this);
    // this.setMuted = this.setMuted.bind(this);
  }
  
  componentDidMount() {
    // this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  showIndex = () => {
    this.props.history.push( `/index`)
  }

  onCollapse = () => {
    if(this.state.dongStyle.width ==='220px') {
      this.setState({ 
        dongStyle:{
          width:'90px',
          transition:`width 0.1s linear 0s`
      },
      iconStyle:{
        icon:require('../../images/on_icon.png'),
          width:'26px',
          height:'26px',
          position: 'absolute',
          left: '30px',
          bottom: '162px',
      }
      });
    }else{
      this.setState({ 
        dongStyle:{
          width:'220px',
          transition:`width 0.1s linear 0s`
      },
      iconStyle:{
          icon:require('../../images/off_icon.png'),
          width:'26px',
          height:'26px',
          position: 'absolute',
          left: '160px',
          bottom: '162px',
      }
      });
    }
  };

  render() {
    return (
      <div className="content">
        <div className="left">
          <img className="leftImg" alt="" src={bgc} style={this.state.dongStyle}/>
          
          {this.state.dongStyle.width ==='220px' ? ( <div className="name">
            <img className="leftImg" src={homeIcon} alt=""/>
            <div className="nameText">张若谷</div>
          </div>) : ( <img className="isleftImg" alt="" src={homeIcon} />)}


          {this.state.dongStyle.width ==='220px' ? ( 
          <div className="titleOne">
            <img className="videoIcon" alt="" src={videoIcon} />
            <div className="videoText">
              <div className="one">视频</div>
              <div className="two">为什么要学习编程</div>
            </div>
          </div>) : ( <img alt="" className="isvideoIcon" src={videoIcon} />)}

          {this.state.dongStyle.width ==='220px' ? ( 
             <div className="titleTwo">
             <img className="videoIcon" src={workIcon} alt=""/>
             <div className="videoText">
               <div className="one">作业</div>
               <div className="two">作业设计一个程序</div>
             </div>
           </div>) : ( <img alt="" className="isworkIcon" src={workIcon} />)}

           {this.state.dongStyle.width ==='220px' ? ( 
             <div className="titleThree">
             <img className="videoIcon" alt="" src={answerIcon} />
             <div className="videoText">
               <div className="one">答题</div>
               <div className="two">答题学习知识</div>
             </div>
           </div>) : ( <img alt="" className="isanswerIcon" src={answerIcon} />)}
          
          {this.state.dongStyle.width ==='220px' ? (
         <div  onClick={this.showIndex}>
            <img alt="" className="homeIcon" src={homeIcon}/>
            <img alt="" className="home" src={homeIconBg}/>
         </div>
         ) : ''}
          <img alt="" className="onIcon" style={this.state.iconStyle} src={this.state.iconStyle.icon} onClick={this.onCollapse}/>
        </div>
        <div className="right">
          {/* <video className="rightVideo" controls="controls" autoPlay={true}>
              <source src={this.state.videos}
            type="video/mp4" /></video> */}
             <Player className="rightVideo" ref={(player) => { this.player = player }} videoId="video-1" playsInline>
               <source src={this.state.videos}/>
             </Player>

        </div>
      </div>
    );
  }
}

export default video;
