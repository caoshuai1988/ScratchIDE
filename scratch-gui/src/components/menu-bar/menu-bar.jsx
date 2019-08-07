import classNames from 'classnames';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';

import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import CommunityButton from './community-button.jsx';
import ShareButton from './share-button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SaveStatus from './save-status.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import ProjectWatcher from '../../containers/project-watcher.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import AuthorInfo from './author-info.jsx';
import AccountNav from '../../containers/account-nav.jsx';
import LoginDropdown from './login-dropdown.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import SaveCloud from '../../containers/cloud-save.jsx';
import FetchCloud from '../../containers/cloud-fetch.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx';

// import {openTipsLibrary} from '../../reducers/modals';
import {setPlayer} from '../../reducers/mode';
import {
    autoUpdateProject,
    getIsUpdating,
    getIsShowingProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy
} from '../../reducers/project-state';
import {
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen
} from '../../reducers/menus';

import collectMetadata from '../../lib/collect-metadata';

import styles from './menu-bar.css';

import mystuffIcon from './icon--mystuff.png';
import profileIcon from './icon--profile.png';
import remixIcon from './icon--remix.svg';
import dropdownCaret from './dropdown-caret.svg';
// import languageIcon from '../language-selector/language-icon.svg';
import language_zh from '../language-selector/icon_lang_zh.png';
import language_en from '../language-selector/icon_lang_en.png';
// import scratchLogo from './scratch-logo.svg';
import scratchLogo from './logo.png'

import sharedMessages from '../../lib/shared-messages';

const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Tutorials',
        description: 'accessibility text for the tutorials button'
    }
});

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, isRtl, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        isRtl={isRtl}
        place={isRtl ? 'left' : 'right'}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    isRtl: PropTypes.bool
};

class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickNew',
            'handleClickRemix',
            'handleClickSave',
            'handleClickSaveAsCopy',
            'handleClickSeeCommunity',
            'handleClickShare',
            'handleKeyPress',
            'handleLanguageMouseUp',
            'handleRestoreOption',
            'handleSaveToComputer',
            'handleSaveToCloud',
            'restoreOptionMessage'
        ]);
        this.state = {
            userInfo : {
                username: '小小柯',
                operate: 'Free', //自由创作 ->继续
                avatar: 'data:image/png;base64,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',
            }
        }
    }
    componentDidMount () {
        let paramUrl =  window.location.search.substring(1)
        let param = paramUrl.substring(paramUrl.indexOf('=')+1)

        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    handleClickNew () {
        // if the project is dirty, and user owns the project, we will autosave.
        // but if they are not logged in and can't save, user should consider
        // downloading or logging in first.
        // Note that if user is logged in and editing someone else's project,
        // they'll lose their work.

        /* 当前作品变动 会提示是否放弃当前作品 */
        const readyToReplaceProject = this.props.confirmReadyToReplaceProject(
            this.props.intl.formatMessage(sharedMessages.replaceProjectWarning)
        );

        this.props.onRequestCloseFile();
        if (readyToReplaceProject) {
            this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        }
        this.props.onRequestCloseFile();
    }
    handleClickRemix () {
        this.props.onClickRemix();
        this.props.onRequestCloseFile();
    }
    handleClickSave () {
        this.props.onClickSave();
        this.props.onRequestCloseFile();
    }
    handleClickSaveAsCopy () {
        this.props.onClickSaveAsCopy();
        this.props.onRequestCloseFile();
    }
    handleClickSeeCommunity (waitForUpdate) {
        if (this.props.shouldSaveBeforeTransition()) {
            this.props.autoUpdateProject(); // save before transitioning to project page
            waitForUpdate(true); // queue the transition to project page
        } else {
            waitForUpdate(false); // immediately transition to project page
        }
    }
    handleClickShare (waitForUpdate) {
        if (!this.props.isShared) {
            if (this.props.canShare) { // save before transitioning to project page
                this.props.onShare();
            }
            if (this.props.canSave) { // save before transitioning to project page
                this.props.autoUpdateProject();
                waitForUpdate(true); // queue the transition to project page
            } else {
                waitForUpdate(false); // immediately transition to project page
            }
        }
    }
    handleRestoreOption (restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleKeyPress (event) {
        const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
        if (modifier && event.key === 's') {
            this.props.onClickSave();
            event.preventDefault();
        }
    }
    handleSaveToComputer (downloadProjectCallback) {
        return () => {
            this.props.onRequestCloseFile();
            downloadProjectCallback();
            if (this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
                this.props.onProjectTelemetryEvent('projectDidSave', metadata);
            }
        };
    }
    handleSaveToCloud(saveProjectCloudCallBack) {
        return () => {
            this.props.onRequestCloseFile()
            saveProjectCloudCallBack()
            if(this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale)
                this.props.onProjectTelemetryEvent('projectDidSave', metadata)
            }
        }
    }

    handleLanguageMouseUp (e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    restoreOptionMessage (deletedItem) {
        switch (deletedItem) {
        case 'Sprite':
            return (<FormattedMessage
                defaultMessage="Restore Sprite"
                description="Menu bar item for restoring the last deleted sprite."
                id="gui.menuBar.restoreSprite"
            />);
        case 'Sound':
            return (<FormattedMessage
                defaultMessage="Restore Sound"
                description="Menu bar item for restoring the last deleted sound."
                id="gui.menuBar.restoreSound"
            />);
        case 'Costume':
            return (<FormattedMessage
                defaultMessage="Restore Costume"
                description="Menu bar item for restoring the last deleted costume."
                id="gui.menuBar.restoreCostume"
            />);
        case 'Reset': 
            return (<span>重置</span>)
        default: {
            return (<FormattedMessage
                defaultMessage="Restore"
                description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                id="gui.menuBar.restore"
            />);
        }
        }
    }

    workOptionMessage (operateItem) {
        switch (operateItem) {
            case 'Continue':
                return (<span>继续</span>);
            case 'Release':
                return (<span>发布作品</span>);
            case 'Submit':
                return (<span>提交作业</span>);
            default: {
                return (<span></span>);
            }
        }
    }

    restoreOptionMessage (deletedItem) {
        switch (deletedItem) {
        case 'Sprite':
            return (<FormattedMessage
                defaultMessage="Restore Sprite"
                description="Menu bar item for restoring the last deleted sprite."
                id="gui.menuBar.restoreSprite"
            />);
        case 'Sound':
            return (<FormattedMessage
                defaultMessage="Restore Sound"
                description="Menu bar item for restoring the last deleted sound."
                id="gui.menuBar.restoreSound"
            />);
        case 'Costume':
            return (<FormattedMessage
                defaultMessage="Restore Costume"
                description="Menu bar item for restoring the last deleted costume."
                id="gui.menuBar.restoreCostume"
            />);
        case 'Reset': 
            return (<span>重置</span>)
        default: {
            return (<FormattedMessage
                defaultMessage="Restore"
                description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                id="gui.menuBar.restore"
            />);
        }
        }
    }

    render () {
        const saveNowMessage = (
            <FormattedMessage
                defaultMessage="Save now"
                description="Menu bar item for saving now"
                id="gui.menuBar.saveNow"
            />
        );
        const createCopyMessage = (
            <FormattedMessage
                defaultMessage="Save as a copy"
                description="Menu bar item for saving as a copy"
                id="gui.menuBar.saveAsCopy"
            />
        );
        const remixMessage = (
            <FormattedMessage
                defaultMessage="Remix"
                description="Menu bar item for remixing"
                id="gui.menuBar.remix"
            />
        );
        const newProjectMessage = (
            <FormattedMessage
                defaultMessage="New"
                description="Menu bar item for creating a new project"
                id="gui.menuBar.new"
            />
        );
        const remixButton = (
            <Button
                className={classNames(
                    styles.menuBarButton,
                    styles.remixButton
                )}
                iconClassName={styles.remixButtonIcon}
                iconSrc={remixIcon}
                onClick={this.handleClickRemix}
            >
                {remixMessage}
            </Button>
        );
        return (
            <Box
                className={classNames(
                    this.props.className,
                    styles.menuBar
                )}
            >
                {/*nav左边部分*/}
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        {/* 头部最左边的图片 */}
                        <div className={classNames(styles.menuBarItem)}>
                        {/* gui_menu-bar-position_3U1T0 menu-bar_menu-bar_JcuHF box_box_2jjDp */}
                            {/* const onClickLogo = () => {
                                window.location = 'https://scratch.mit.edu';
                            }; */}
                            <img
                                alt="柯基编程"
                                className={classNames(styles.scratchLogo, {
                                    [styles.clickable]: typeof this.props.onClickLogo !== 'undefined'
                                })}
                                draggable={false}
                                src={scratchLogo}
                                onClick={this.props.onClickLogo}
                            />
                        </div>

                         {/* 头部转换各种语言 */}
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        >
                            <div>
                                {/* 转换语言图片 */}
                                <img
                                    className={styles.languageIcon}
                                    src={this.props.currentLocale === 'en' ? language_en: language_zh}
                                />
                                {/* 下拉框 */}
                                {/* <img
                                    className={styles.languageCaret}
                                    src={dropdownCaret}
                                /> */}
                            </div>
                            <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
                        </div>

                        {/* 头部文件包 */}
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.fileMenuOpen
                            })}
                            onMouseUp={this.props.onClickFile}
                        >
                            <FormattedMessage
                                defaultMessage="File"
                                description="Text for file dropdown menu"
                                id="gui.menuBar.file"
                            />
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.fileMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseFile}
                            >
                                <MenuSection>
                                    <MenuItem
                                        isRtl={this.props.isRtl}
                                        onClick={this.handleClickNew}
                                    >
                                        {newProjectMessage}
                                    </MenuItem>
                                </MenuSection>
                                {(this.props.canSave || this.props.canCreateCopy || this.props.canRemix) && (
                                    <MenuSection>
                                        {this.props.canSave ? (
                                            <MenuItem onClick={this.handleClickSave}>
                                                {saveNowMessage}
                                            </MenuItem>
                                        ) : []}
                                        {this.props.canCreateCopy ? (
                                            <MenuItem onClick={this.handleClickSaveAsCopy}>
                                                {createCopyMessage}
                                            </MenuItem>
                                        ) : []}
                                        {this.props.canRemix ? (
                                            <MenuItem onClick={this.handleClickRemix}>
                                                {remixMessage}
                                            </MenuItem>
                                        ) : []}
                                    </MenuSection>
                                )}
                                <MenuSection>
                                    <SBFileUploader
                                        canSave={this.props.canSave}
                                        userOwnsProject={this.props.userOwnsProject}
                                        onUpdateProjectTitle={this.props.onUpdateProjectTitle}
                                    >
                                        {(className, renderFileInput, loadProject) => (
                                            <MenuItem
                                                className={className}
                                                onClick={loadProject}
                                            >
                                                {this.props.intl.formatMessage(sharedMessages.loadFromComputerTitle)}
                                                {renderFileInput()}
                                            </MenuItem>
                                        )}
                                    </SBFileUploader>
                                    <SB3Downloader>{(className, downloadProjectCallback) => (
                                        <MenuItem
                                            className={className}
                                            onClick={this.handleSaveToComputer(downloadProjectCallback)}
                                        >
                                            <FormattedMessage
                                                defaultMessage="Save to your computer"
                                                description="Menu bar item for downloading a project to your computer"
                                                id="gui.menuBar.downloadToComputer"
                                            />
                                        </MenuItem>
                                    )}</SB3Downloader>
                                    <FetchCloud
                                        canSave={this.props.canSave}
                                        userOwnsProject={this.props.userOwnsProject}
                                        onUpdateProjectTitle={this.props.onupdateProjectTitle}
                                    >
                                        {(className, renderFileModal, loadProject) => (
                                            <MenuItem
                                                className={className}
                                                onClick={loadProject}
                                            >
                                            <span>从云端加载</span>
                                            {renderFileModal()}
                                            </MenuItem>
                                        )}
                                    </FetchCloud>
                                    <SaveCloud>{(className, saveProjectCloudCallBack) => (
                                        <MenuItem
                                            className={className}
                                            onClick={this.handleSaveToCloud(saveProjectCloudCallBack)}
                                        >
                                        <span>保存到云端</span>
                                        </MenuItem>
                                    )}
                                    </SaveCloud>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                        
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.editMenuOpen
                            })}
                            onMouseUp={this.props.onClickEdit}
                        >
                            <div className={classNames(styles.editMenu)}>
                                <FormattedMessage
                                    defaultMessage="Edit"
                                    description="Text for edit dropdown menu"
                                    id="gui.menuBar.edit"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.editMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseEdit}
                            >
                                <DeletionRestorer>{(handleRestore, {restorable, deletedItem}) => (
                                    <MenuItem
                                        className={classNames({[styles.disabled]: !restorable})}
                                        onClick={this.handleRestoreOption(handleRestore)}
                                    >
                                      {this.restoreOptionMessage(deletedItem)}
                                    </MenuItem>
                                )}</DeletionRestorer>
                                  <DeletionRestorer reset={true}>{(handleRestore) => (
                                    <MenuItem onClick={this.handleRestoreOption(handleRestore)}
                                    >
                                      {this.restoreOptionMessage('Reset')}
                                    </MenuItem>
                                )}</DeletionRestorer>
                                <MenuSection>
                                    <TurboMode>{(toggleTurboMode, {turboMode}) => (
                                        <MenuItem onClick={toggleTurboMode}>
                                            {turboMode ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off Turbo Mode"
                                                    description="Menu bar item for turning off turbo mode"
                                                    id="gui.menuBar.turboModeOff"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on Turbo Mode"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.turboModeOn"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</TurboMode>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                    </div>
                    {/* <div
                        aria-label={this.props.intl.formatMessage(ariaMessages.tutorials)}
                        className={classNames(styles.menuBarItem, styles.hoverable)}
                        onClick={this.props.onOpenTipLibrary}
                    >
                        <FormattedMessage {...ariaMessages.tutorials} />
                    </div> */}
                    
                    {/* {this.props.canEditTitle ? (
                        <div className={classNames(styles.menuBarItem, styles.growable)}>
                            <MenuBarItemTooltip
                                enable
                                id="title-field"
                            >
                                <ProjectTitleInput
                                    className={classNames(styles.titleFieldGrowable)}
                                    onUpdateProjectTitle={this.props.onUpdateProjectTitle}
                                />
                            </MenuBarItemTooltip>
                        </div>
                    ) : ((this.props.authorUsername && this.props.authorUsername !== this.props.username) ? (
                        <AuthorInfo
                            className={styles.authorInfo}
                            imageUrl={this.props.authorThumbnailUrl}
                            projectTitle={this.props.projectTitle}
                            userId={this.props.authorId}
                            username={this.props.authorUsername}
                        />
                    ) : null)} */}

                    {/* 分享 */}
                    {/* <div className={classNames(styles.menuBarItem)}>
                        { this.props.canShare || 1 ? (
                            (this.props.isShowingProject || this.props.isUpdating) && (
                                <ProjectWatcher onDoneUpdating={this.props.onSeeCommunity}>
                                    {
                                        waitForUpdate => (
                                            <ShareButton
                                                className={styles.menuBarButton}
                                                isShared={this.props.isShared}
                                                onClick={() => {
                                                    this.handleClickShare(waitForUpdate);
                                                }}
                                            />
                                        )
                                    }
                                </ProjectWatcher>
                            )
                        ) : (
                            this.props.showComingSoon ? (
                                <MenuBarItemTooltip id="share-button">
                                    <ShareButton className={styles.menuBarButton} />
                                </MenuBarItemTooltip>
                            ) : []
                        )}
                        {this.props.canRemix ? remixButton : []}
                    </div> */}
                    
                    {/* <div className={classNames(styles.menuBarItem, styles.communityButtonWrapper)}>
                        {this.props.enableCommunity ? (
                            (this.props.isShowingProject || this.props.isUpdating) && (
                                <ProjectWatcher onDoneUpdating={this.props.onSeeCommunity}>
                                    {
                                        waitForUpdate => (
                                            <CommunityButton
                                                className={styles.menuBarButton}
                                                onClick={() => {
                                                    this.handleClickSeeCommunity(waitForUpdate);
                                                }}
                                            />
                                        )
                                    }
                                </ProjectWatcher>
                            )
                        ) : (this.props.showComingSoon ? (
                            <MenuBarItemTooltip id="community-button">
                                <CommunityButton className={styles.menuBarButton} />
                            </MenuBarItemTooltip>
                        ) : [])}
                    </div> */}
                </div>

                {/* show the proper UI in the account menu, given whether the user is
                logged in, and whether a session is available to log in with */}

                {/*nav右边部分*/}
                <div className={styles.accountInfoGroup}>
                    {/* 右边头部的文件包 */}
                    <div className={styles.menuBarItem}>
                        {this.props.canSave && (
                            <SaveStatus />
                        )}
                        <SB3Downloader>{(className, downloadProjectCallback, downloadProjectServeCallback) => (
                            <MenuItem
                                // className={className}
                                className={classNames(styles.operateBtn, className)}
                                onClick={this.handleSaveToCloud(downloadProjectServeCallback)}
                            >
                                {this.workOptionMessage('Submit')}
                            </MenuItem>
                        )}
                        </SB3Downloader>
                    </div>
                    {this.props.sessionExists ? (
                        this.props.username ? (
                            // ************ user is logged in ************
                            <React.Fragment>
                                1111
                                <a href="/mystuff/">
                                    <div
                                        className={classNames(
                                            styles.menuBarItem,
                                            styles.hoverable,
                                            styles.mystuffButton
                                        )}
                                    >
                                        <img
                                            className={styles.mystuffIcon}
                                            src={mystuffIcon}
                                        />
                                    </div>
                                </a>
                                <AccountNav
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable,
                                        {[styles.active]: this.props.accountMenuOpen}
                                    )}
                                    isOpen={this.props.accountMenuOpen}
                                    isRtl={this.props.isRtl}
                                    menuBarMenuClassName={classNames(styles.menuBarMenu)}
                                    onClick={this.props.onClickAccount}
                                    onClose={this.props.onRequestCloseAccount}
                                    onLogOut={this.props.onLogOut}
                                />
                            </React.Fragment>
                        ) : (
                            // ********* user not logged in, but a session exists
                            // ********* so they can choose to log in
                            <React.Fragment>
                                <div
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable
                                    )}
                                    key="join"
                                    onMouseUp={this.props.onOpenRegistration}
                                >
                                    <FormattedMessage
                                        defaultMessage="Join Scratch"
                                        description="Link for creating a Scratch account"
                                        id="gui.menuBar.joinScratch"
                                    />
                                </div>
                                <div
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable
                                    )}
                                    key="login"
                                    onMouseUp={this.props.onClickLogin}
                                >
                                    <FormattedMessage
                                        defaultMessage="Sign in"
                                        description="Link for signing in to your Scratch account"
                                        id="gui.menuBar.signIn"
                                    />
                                    <LoginDropdown
                                        className={classNames(styles.menuBarMenu)}
                                        isOpen={this.props.loginMenuOpen}
                                        isRtl={this.props.isRtl}
                                        renderLogin={this.props.renderLogin}
                                        onClose={this.props.onRequestCloseLogin}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        // ******** no login session is available, so don't show login stuff
                        <React.Fragment>
                            {this.props.showComingSoon ? (
                                <React.Fragment>
                                    <MenuBarItemTooltip id="mystuff">
                                        <div
                                            className={classNames(
                                                styles.menuBarItem,
                                                styles.hoverable,
                                                styles.mystuffButton
                                            )}
                                        >
                                            <img
                                                className={styles.mystuffIcon}
                                                src={mystuffIcon}
                                            />
                                        </div>
                                    </MenuBarItemTooltip>
                                    <MenuBarItemTooltip
                                        id="account-nav"
                                        place={this.props.isRtl ? 'right' : 'left'}
                                    >
                                        <div
                                            className={classNames(
                                                styles.menuBarItem,
                                                styles.hoverable,
                                                styles.accountNavMenu
                                            )}
                                        >
                                            <img
                                                className={styles.profileIcon}
                                                src={profileIcon}
                                            />
                                            <span>
                                                {'scratch-cat'}
                                            </span>
                                            <img
                                                className={styles.dropdownCaretIcon}
                                                src={dropdownCaret}
                                            />
                                        </div>
                                    </MenuBarItemTooltip>
                                </React.Fragment>
                            ) : []}
                        </React.Fragment>
                    )}
                </div>
            </Box>
        );
    }
}

MenuBar.propTypes = {
    accountMenuOpen: PropTypes.bool,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    authorThumbnailUrl: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoUpdateProject: PropTypes.func,
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canEditTitle: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    className: PropTypes.string,
    confirmReadyToReplaceProject: PropTypes.func,
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    isRtl: PropTypes.bool,
    isShared: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    isUpdating: PropTypes.bool,
    languageMenuOpen: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    loginMenuOpen: PropTypes.bool,
    onClickAccount: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onClickLogin: PropTypes.func,
    onClickLogo: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickRemix: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickSaveAsCopy: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    // onOpenTipLibrary: PropTypes.func,
    onProjectTelemetryEvent: PropTypes.func,
    onRequestCloseAccount: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onRequestCloseLogin: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    projectTitle: PropTypes.string,
    renderLogin: PropTypes.func,
    sessionExists: PropTypes.bool,
    shouldSaveBeforeTransition: PropTypes.func,
    showComingSoon: PropTypes.bool,
    userOwnsProject: PropTypes.bool,
    username: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired,
    currentLocale: PropTypes.string.isRequired,
};

MenuBar.defaultProps = {
    onShare: () => {}
};

const mapStateToProps = (state, ownProps) => {
    const loadingState = state.scratchGui.projectState.loadingState;
    const user = state.session && state.session.session && state.session.session.user;
    return {
        accountMenuOpen: accountMenuOpen(state),
        fileMenuOpen: fileMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        isRtl: state.locales.isRtl,
        isUpdating: getIsUpdating(loadingState),
        isShowingProject: getIsShowingProject(loadingState),
        languageMenuOpen: languageMenuOpen(state),
        locale: state.locales.locale,
        loginMenuOpen: loginMenuOpen(state),
        projectTitle: state.scratchGui.projectTitle,
        sessionExists: state.session && typeof state.session.session !== 'undefined',
        username: user ? user.username : null,
        userOwnsProject: ownProps.authorUsername && user &&
            (ownProps.authorUsername === user.username),
        vm: state.scratchGui.vm,
        operateWork: state.scratchGui.operateWork. operateItem, //操作作品
        currentLocale: state.locales.locale, //当前语言
    };
};

const mapDispatchToProps = dispatch => ({
    autoUpdateProject: () => dispatch(autoUpdateProject()),
    // onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickAccount: () => dispatch(openAccountMenu()),
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onClickLogin: () => dispatch(openLoginMenu()),
    onRequestCloseLogin: () => dispatch(closeLoginMenu()),
    onClickNew: needSave => dispatch(requestNewProject(needSave)),
    onClickRemix: () => dispatch(remixProject()),
    onClickSave: () => dispatch(manualUpdateProject()),
    onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
    onSeeCommunity: () => dispatch(setPlayer(true))
});

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MenuBar);
