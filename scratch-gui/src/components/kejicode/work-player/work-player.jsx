import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import styles from './work-player.css';
import classNames from 'classnames';

class WorkPlayer extends React.PureComponent {
    constructor(props){
        super(props)
        // bindAll(this, [
        //     'deleteSelPic',
        //     'handlePublishWork'
        // ]);
        this.state = {

        }
    }
    //点赞
    handleLiker() {
        
    }

    //查看源码
    handleViewSource() {
    }

    render () {
        return (<div className={styles.mask}>
            <div className={styles.mask_container}>
                <div className={styles.hand}>
                    <div className={styles.hand_left}>
                        <div className={styles.title}>这是作品名称</div>
                        <div className={styles.release_date}>
                            浏览128次&nbsp;&nbsp;|&nbsp;&nbsp;发布于2019.06.28&nbsp;&nbsp;13:28
                        </div>
                    </div>
                    <div className={styles.hand_right}>
                        <div className={styles.avatar}>头像</div>
                        <div className={styles.user_name}>白小鞋同学</div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.left_content}>
                        player
                    </div>
                    <div className={styles.middle_content}></div>
                    <div className={styles.right_content}>
                        <div className={styles.introduction}>
                            <div className={styles.intro_title}>作品介绍与操作说明</div>
                            <div className={styles.intro_content}>这里是作品介绍和操作说明文案这里是作品介绍和操作说明文案这里是作品介绍和操作说明文案这里是作品介绍和操作说明文案</div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.comment_title}>艾伦老师点评</div>
                            <div className={styles.comment_content}>这里是老师的点评文案</div>
                        </div>
                        <div className={styles.buttons}> 
                            <button className={styles.orange_btn}>点赞</button>
                            <button className={styles.blue_btn}>查看源码</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

// const mapStateToProps = state => ({
    
// });

// export default connect(
//     mapStateToProps,
//     () => ({})
// )(WorkPlayer);
export default WorkPlayer