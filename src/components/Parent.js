import React from "react";
import SideMenu from "./SideMenu";
import MainDisplay from "./MainDisplay";
import { connect } from "react-redux"

class Parent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeFolder: null,
            activeFolderData: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            activeFolder: nextProps.activeFolder,
            activeFolderData: nextProps.activeFolderData
        }
    }

    render() {
        let { activeFolder, activeFolderData } = this.props
        return (
            <div style={{ padding: "2%" }}>
                <div style={{ width: "25%", height: "105.2%", float: "left", backgroundColor: "#F9FAFC", display: "block" }}>
                    <SideMenu activeFolder={activeFolder} activeFolderData={activeFolderData} />
                </div>
                <div style={{ width: "65%", height: "105.2%", float: "left" }}>
                    <MainDisplay />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (state.data) {
        return {
            activeFolderData: state.data.activeFolderData,
            activeFolder: state.data.activeFolderData ? state.data.activeFolderData.activeFolder : null
        }
    }
    return {};
}

export default connect(mapStateToProps)(Parent);