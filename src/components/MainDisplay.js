import React from "react";
import { Icon, Grid } from "semantic-ui-react";
import CreateNew from "../popups/CreateNew";
import FileInfo from "../popups/FileInfo"
import { connect } from "react-redux";
import { fetchInitialData, getFolderDetails, goOneFolderUp, deleteFile } from "../actions";

let fullPath = ["root"];
let allData = []

class MainDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            createNew: false,
            fileType: "file",
            viewFileInfo: false,
            activeFolder: null,
            activeFolderData: null,
            currentFolder: null,
            item: null
        }
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchInitialData();
        document.addEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        if (wasOutside && visible)
            this.setState({ visible: false });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.activeFolderData) {
            let data = {}
            data.activeFolder = nextProps.activeFolderData.activeFolder
            data.activeFolderData = nextProps.activeFolderData
            allData.push(data)
        }
        if (nextProps !== prevState) {
            return {
                activeFolderData: nextProps.activeFolderData ? nextProps.activeFolderData : null,
                currentFolder: prevState.activeFolderData ? prevState.activeFolderData.activeFolder : null
            }
        }
    }

    handleRightClick = (e, item, fileType) => {
        e.preventDefault();
        this.setState({ visible: true, fileType, item })
    }

    changeCreateNew = (flag) => {
        this.setState({ createNew: flag })
    }

    changeFileInfo = (flag) => {
        this.setState({ viewFileInfo: flag, visible: false })
    }

    showFilesInMainDisplay = (dataTodisplay) => {
        return (<div>
            {(Object.keys(dataTodisplay).map(f => {
                if (f === "folder") {
                    return (
                        Object.keys(dataTodisplay[f]).map((key, index) => {
                            return (this.filesAndFoldersDisplay(key, index, f))
                        })
                    )
                }
                else if (f === "file") {
                    return (
                        Object.keys(dataTodisplay[f]).map((key, index) => {
                            return (this.filesAndFoldersDisplay(key, index, f))
                        })
                    )
                }
                else
                    return null;
            })
            )}
        </div>)
    }

    filesAndFoldersDisplay = (item, index, fileType) => {
        return (
            <Icon name={fileType} key={index} size="huge" style={{ color: "#FDCD53", paddingLeft: "30px" }}
                onContextMenu={(e) => this.handleRightClick(e, item, fileType)} onDoubleClick={() => this.handleDoubleClick(item, fileType)}>
                <h6 style={{ margin: "5%", height: "15%", width: "9.5%", padding: "5px 4.7%", fontSize: "30%", fontFamily: "Lato-Regular", color: "#535B62" }}>{item}</h6>
            </Icon>

        )
    }

    openFile = (fileType, item) => {
        if (fileType === "folder") {
            this.handleDoubleClick(item, fileType)
        }
        else if (fileType === "file") {
            return (
                <FileInfo showFileInfo={true} changeFileInfo={this.changeFileInfo} fileType={fileType} item={item} />
            )
        }
    }

    deleteFile = (item, fileType) => {
        this.props.deleteFile(item, fileType, allData, fullPath)
    }

    handleDoubleClick = (item, fileType) => {
        if (fileType === "file") {
            this.setState({ viewFileInfo: true, item, fileType })
            return (
                <FileInfo showFileInfo={true} changeFileInfo={this.changeFileInfo} fileType={fileType} item={item} />
            )
        }
        else if (fileType === "folder") {
            this.setState({ activeFolder: item },
                () => this.props.getFolderDetails(this.state.activeFolderData, this.state.activeFolder))
        }
    }

    showPath = () => {
        if (this.state.currentFolder !== this.props.activeFolderData.activeFolder) {
            if (fullPath.length === 1)
                fullPath = `${fullPath} / ${this.props.activeFolderData.activeFolder}`
            else if (fullPath.length > 1 && fullPath.split('/').map(i => i.trim()).lastIndexOf(this.props.activeFolderData.activeFolder) === -1) {
                fullPath = `${fullPath} / ${this.props.activeFolderData.activeFolder}`
            }
        }
        return fullPath;
    }

    goOneFolderUp = () => {
        let pathToGo = fullPath.split('/')
        this.changePath(pathToGo)
        this.setState({ activeFolder: pathToGo[pathToGo.length - 1].trim() })
        this.props.goOneFolderUp(allData, pathToGo[pathToGo.length - 1].trim())
    }

    changePath = (pathToGo) => {
        pathToGo.splice(pathToGo.length - 1, 1)
        fullPath = pathToGo.join("/")
    }

    render() {
        const { visible } = this.state;
        return (
            <Grid>
                <Grid.Row>
                    {this.props.activeFolderData ?
                        (this.props.activeFolderData.activeFolder === "root" ? null :
                            <Icon name="arrow alternate circle up" onClick={this.goOneFolderUp} style={{ float: "left", margin: "5px 30px" }} />)
                        : null}

                    {this.props.activeFolderData ?
                        (this.props.activeFolderData.activeFolder && this.props.activeFolderData.activeFolder !== "root" ?
                            <h3 style={{ padding: "0 20px" }}>{this.showPath()}</h3> : <h3 style={{ padding: "0 20px" }}>{fullPath}</h3>)
                        : null}

                </Grid.Row>

                <Grid.Row>
                    {this.state.viewFileInfo === true ?
                        <FileInfo showFileInfo={true} changeFileInfo={this.changeFileInfo} fileType={this.state.fileType} item={this.state.item} /> : null}

                    {this.state.activeFolderData ? this.showFilesInMainDisplay(this.props.activeFolderData) : null}<br /><br />

                    <h3 style={{ margin: "10px 40px", border: "1px dashed", padding: "20px" }} onClick={() => this.setState({ createNew: true })}>+</h3>

                    {this.state.createNew === true ? <CreateNew allData={allData} createNew={true}
                        activeFolder={this.state.activeFolderData.activeFolder} changeCreateNew={this.changeCreateNew} /> : null}
                    <br /><br />

                    {visible === true ?
                        <div ref={ref => { this.root = ref }}>
                            <div onClick={() => this.openFile(this.state.fileType, this.state.item)}>Open</div>
                            <div onClick={() => this.setState({ viewFileInfo: true })}>Get Info</div>
                            <div onClick={() => this.deleteFile(this.state.item, this.state.fileType)}>Delete</div>
                        </div>
                        : null
                    }
                </Grid.Row>

            </Grid>
        )
    }
}

function mapStateToProps(state) {
    if (state.data) {
        return {
            activeFolderData: state.data.activeFolderData
        }
    }
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInitialData: () => dispatch(fetchInitialData()),
        getFolderDetails: (folderData, item) => dispatch(getFolderDetails(folderData, item)),
        goOneFolderUp: (allData, path) => dispatch(goOneFolderUp(allData, path)),
        deleteFile: (item, fileType, allData, fullPath) => dispatch(deleteFile(item, fileType, allData, fullPath)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDisplay);
