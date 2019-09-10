import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import saveCloud from '../lib/save-cloud';

class SaveCloud extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'saveProjectCloud'
        ]);
    }
    saveProjectCloud () {
        let productionId = ''; //作品id
        let stepId = this.props.stepId; // 步骤id
        this.props.saveProjectSb3().then(content => {
            saveCloud(this.props.projectFilename, productionId, stepId, content);
        });
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.saveProjectCloud
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

SaveCloud.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    stepId: PropTypes.string
};
SaveCloud.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    stepId: state.scratchGui.stepId
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SaveCloud);
