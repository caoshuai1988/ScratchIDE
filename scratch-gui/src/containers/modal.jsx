import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ModalComponent from '../components/modal/modal.jsx';
import ModalMaskComponent from '../components/modal/mask-modal.jsx';

class Modal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'addEventListeners',
            'removeEventListeners',
            'handlePopState',
            'pushHistory'
        ]);
        this.addEventListeners();
        this.state = {
            modalType: this.props.modalType ? this.props.modalType: ''
        }
    }
    componentDidMount () {
        // Add a history event only if it's not currently for our modal. This
        // avoids polluting the history with many entries. We only need one.
        this.pushHistory(this.id, (history.state === null || history.state !== this.id));
    }
    componentWillUnmount () {
        this.removeEventListeners();
    }
    addEventListeners () {
        window.addEventListener('popstate', this.handlePopState);
    }
    removeEventListeners () {
        window.removeEventListener('popstate', this.handlePopState);
    }
    handlePopState () {
        // Whenever someone navigates, we want to be closed
        this.props.onRequestClose();
    }
    get id () {
        return `modal-${this.props.id}`;
    }
    pushHistory (state, push) {
        if (push) return history.pushState(state, this.id);
        history.replaceState(state, this.id);
    }
    render () {
        return(
            this.state.modalType ==='mask' ?  
            <ModalMaskComponent {...this.props} /> :  <ModalComponent {...this.props} />
        ) 
    }
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

export default connect(
    mapStateToProps
)(Modal);
