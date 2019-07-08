import React, { Component } from 'react';
import './index.scss';
const bgc = require('../../images/bgc.jpg')
const course = require('../../images/course.png')
const mainChange = require('../../images/main_change.png')
const mainButton = require('../../images/main_button.png')
const mainMy = require('../../images/main_my.png')
const mainSq = require('../../images/main_sq.png')
const mainFree = require('../../images/main_free.png')
const mainFreeImage = require('../../images/main_free_image.png')
const mainNb = require('../../images/main_nb.png')
const mainSet = require('../../images/main_set.png')

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url:'',
    }
  }

  componentDidMount(){
    
  }

  showVideo = () => {
    this.props.history.push( `/video`)
  }

  Ide = () => {
    // http://62.234.167.195:8601/
    // ?type=3&autoPlay=1&url=${this.state.url}
    window.open(`http://127.0.0.1:8601?type=1&autoPlay=1`)
  }


  render() {
    return (
      <div className="content">
        <div className="set">
          <div className="name">
            <img alt="" src={mainNb}  className="mainNb"/>
            <img alt="" src={mainSq}  className="mainImg"/>
            <div className="nameD">小小柯</div>
          </div>
          <div className="setName">
            <img alt="" src={mainSet}  className="mainSet"/>
          </div>
        </div>
        <img src={bgc} alt=""style={{width:'100%',height:'100%'}}  />
        <div className="con-box">
          <div className="left">
            <img src={course} alt="" className="course"/>
            <div className="title">S1-Scratch基础</div>
            <img src={mainChange} alt="" className="check"/>
            <div className="btn" onClick={this.showVideo}>
              <img src={mainButton} alt="" className="checkBtn"/>
              <div className="run">进入课程</div>
            </div>
          </div>
          <div className="right">
            <div className="ont" onClick={this.showVideo}>
              <img src={mainMy} alt="" className="mainMy"/>
              <div className="ontText">进入课程</div>
            </div>
            <div className="two">
              <img src={mainSq} alt="" className="mainSq"/>
              <div className="ontText">作品社区</div>
            </div>
            <div className="three" onClick={this.Ide}>
              <img src={mainFree} alt="" className="mainFree"/>
              <img src={mainFreeImage} alt="" className="mainFreeImage"/>
              <div className="ontText">自由创作</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
