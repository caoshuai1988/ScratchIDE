import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';
import Box from '../box/box.jsx';
import Stage from '../../containers/stage.jsx';
import StageHeader from '../../containers/stage-header_player.jsx';


import layout, {STAGE_SIZE_MODES} from '../../lib/layout-constants';
import {resolveStageSize} from '../../lib/screen-utils';

import styles from './player.css';

const Player = props => {
    const {
        vm,
        isPlayerOnly,
        stageSizeMode,
        ...componentProps
    } = omit(props, 'dispatch');

    return (<MediaQuery minWidth={'480px'} minHeight={360}>{isFullSize => {
        const stageSize = resolveStageSize(stageSizeMode, isFullSize);
        return (<div>
            <Box className={styles.stageCanvasWrapper}>
                <Stage
                    stageSize={stageSize}
                    vm={vm}
                /> 
            </Box>
            <Box className={styles.stageMenuWrapper}>
                <StageHeader
                    stageSize={stageSize}
                    vm={vm}
                    isPlayerOnly={isPlayerOnly}
                />
            </Box>
        </div>)
    }}</MediaQuery>);
};


const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    vm: state.scratchGui.vm
});

export default injectIntl(connect(
    mapStateToProps
)(Player));
