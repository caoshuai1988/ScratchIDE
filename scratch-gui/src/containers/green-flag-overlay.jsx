import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';
import Box from '../components/box/box.jsx';
import greenFlag from '../components/green-flag/icon--green-flag.svg';
import { setStartedState } from '../reducers/vm-status';

class GreenFlagOverlay extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
        this.state = {
            width:'480px',
          }
    }
    
    componentDidMount(){
        if(!this.props.isFullScreen){
            this.state.width = '100%'
        }else{
            this.state.width = '480px'
        }
    }
    
    handleClick () {
        this.props.vm.start();
        this.props.vm.greenFlag();
        this.props.setStartedState(true)
    }
    render () {
        if (this.props.isStarted) return null;
        
        return (
            <Box
                style={{width:this.state.width}}
                className={this.props.wrapperClass}
                onClick={this.handleClick}
            >
                <div className={this.props.className}>
                    <img
                        draggable={false}
                        src={greenFlag}
                    />
                </div>
            </Box>
        );
    }
}

GreenFlagOverlay.propTypes = {
    className: PropTypes.string,
    isStarted: PropTypes.bool,
    vm: PropTypes.instanceOf(VM),
    wrapperClass: PropTypes.string,
    isFullScreen:PropTypes.bool
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.started,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = (dispatch) => ({
    setStartedState: falg => dispatch(setStartedState(falg)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GreenFlagOverlay);
