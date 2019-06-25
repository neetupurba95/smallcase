import React from "react";
import { connect } from "react-redux";
import { fetchInitialData } from "../actions";
import ShowFoldersAndFiles from "./ShowFoldersAndFiles";

let allSideMenuDetails = [];

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromJSON: null,
            activeIndex: 0,
            activeFolderData: null,
            activeFolder: null
        }
    }

    componentDidMount() {
        if (this.props.activeFolder === "root")
            this.props.fetchInitialData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dataFromJSON) {
            if (nextProps !== prevState) {
                return {
                    dataFromJSON: nextProps.dataFromJSON,
                    activeFolderData: nextProps.activeFolderData,
                    activeFolder: nextProps.activeFolderData ? nextProps.activeFolderData.activeFolder : null
                }
            }
        }
        return null;
    }

    handleAccordionClick = (e, titleProps) => {
        let { activeFolderData } = this.props
        allSideMenuDetails.push(activeFolderData)
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    showFilesFolders = () => {
        const { dataFromJSON } = this.props
        return (Object.values(dataFromJSON).map((item, i) => {
            return (<ShowFoldersAndFiles key={i} handleAccordionClick={this.handleAccordionClick} activeIndex={this.state.activeIndex}
                index={item.index} value={item.folderName} />)
        })
        )
    }

    render() {
        const { activeFolderData } = this.state;
        return (
            <React.Fragment>
                <div><b>ROOT</b></div>
                {activeFolderData ? this.showFilesFolders() : null}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    if (state.data) {
        return ({
            dataFromJSON: state.data.dataFromJSON,
            activeFolderData: state.data ? state.data.activeFolderData : null,
            activeFolder: state.data.activeFolderData ? state.data.activeFolderData.activeFolder : null
        })
    }
    return {};
}

function mapDispatchToProps(dispatch) {
    return ({
        fetchInitialData: () => dispatch(fetchInitialData())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);