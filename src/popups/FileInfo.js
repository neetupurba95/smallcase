import React from "react";
import { Icon, Modal, Header } from "semantic-ui-react";
import { connect } from "react-redux"

class FileInfo extends React.Component {
    state = {
        showFileInfo: true
    }
    showFileDetails = () => {
        let fileInfo = this.props.activeFolderData[this.props.fileType][this.props.item].fileInfo
        return (Object.keys(fileInfo).map(i => {
            return (<tr>
                <th>{i}</th>
                <td>{fileInfo[i]}</td>
            </tr>)
        }))
    }
    render() {
        let fileInfo = this.props.activeFolderData[this.props.fileType][this.props.item].fileInfo
        let fileType = this.props.fileType.toUpperCase();

        return (
            <Modal open={this.props.showFileInfo === true}
                onOpen={() => this.props.changeFileInfo(true)}
                onClose={() => this.props.changeFileInfo(false)}>
                <Modal.Description style={{ padding: "5% 30%" }}>
                    <Header>
                        {`${fileType} INFO`}
                        <Icon name="close" size="mini" onClick={() => this.props.changeFileInfo(false)}
                            style={{ float: "right", padding: "2% 20% 0 0" }} /><br />
                    </Header>
                    <Icon name={this.props.fileType} size="big" /><br /><br />
                    <table>
                        <tbody>
                            {fileInfo ? this.showFileDetails() : null}
                        </tbody>
                    </table>

                </Modal.Description>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeFolderData: state.data.activeFolderData
    }
}

export default connect(mapStateToProps)(FileInfo);