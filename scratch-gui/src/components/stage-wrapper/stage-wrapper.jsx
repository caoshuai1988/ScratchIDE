import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import StageHeader from '../../containers/stage-header.jsx';
import Stage from '../../containers/stage.jsx';
import Loader from '../loader/loader.jsx';

import styles from './stage-wrapper.css';
const StageWrapperComponent = function (props) {
    const {
        isFullScreen,
        isRtl,
        isRendererSupported,
        loading,
        stageSize,
        vm,
        player,
        onSeeInside,
        workInfo
    } = props;
    return (
        <Box>
            {player ? ( 
            <div className={styles.mask}>
                <div className={styles.mask_container}>
                    <div className={styles.hand}>
                        <div className={styles.hand_left}>
                            <div className={styles.title}>{workInfo.title}</div>
                            <div className={styles.release_date}>
                                {/* 浏览128次&nbsp;&nbsp;|&nbsp;&nbsp;发布于{workInfo.create_at} */}
                                发布于{workInfo.create_at}
                            </div>
                        </div>
                        <div className={styles.hand_right}>
                            <div className={styles.avatar}>
                                <img width="100%" src={workInfo.avatar} />
                            </div>
                            <div className={styles.user_name}>{workInfo.nickname}</div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.left_content}>
                            <Box
                                className={styles.stageWrapper}
                                dir={isRtl ? 'rtl' : 'ltr'}
                            >
                                <Box className={styles.stageCanvasWrapper}>
                                    {
                                        isRendererSupported ?
                                            <Stage
                                                stageSize={stageSize}
                                                vm={vm}
                                            /> :
                                            null
                                    }
                                </Box>
                                <Box className={styles.stageMenuWrapper}>
                                    <StageHeader
                                        stageSize={stageSize}
                                        vm={vm}
                                    />
                                </Box>
                                {/* 加载动画 */}
                                {loading ? (
                                    <Loader isFullScreen={isFullScreen} />
                                ) : null}
                            </Box>
                        </div> 
                    <div className={styles.middle_content}></div>
                    <div className={styles.right_content}>
                        <div className={styles.introduction}>
                            <div className={styles.intro_title}>作品介绍与操作说明</div>
                            <div className={styles.intro_content}>{workInfo.desc}</div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.comment_title}>艾伦老师点评</div>
                            <div className={styles.comment_content}>{workInfo.comment}</div>
                        </div>
                        <div className={styles.buttons}> 
                            {/* <button className={styles.orange_btn}>点赞</button> */}
                            <button className={styles.blue_btn} onClick={onSeeInside} >查看源码</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : ( 
        <Box
            className={styles.stageWrapper}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <Box className={styles.stageMenuWrapper}>
                <StageHeader
                    vm={vm}
                />
            </Box>
            <Box className={styles.stageCanvasWrapper}>
                {
                    isRendererSupported ?
                        <Stage
                            stageSize={stageSize}
                            vm={vm}
                        /> :
                        null
                }
            </Box>
            {/* 加载动画 */}
            {loading ? (
                <Loader isFullScreen={isFullScreen} />
            ) : null}
         </Box>)
        }
        </Box>
       
    );
};

StageWrapperComponent.propTypes = {
    isFullScreen: PropTypes.bool,
    isRendererSupported: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired,
    player:PropTypes.bool,
};

export default StageWrapperComponent;
