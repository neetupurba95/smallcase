import React from "react";
import { connect } from "react-redux"
import { Icon, Button, Modal, Header, Form } from "semantic-ui-react";
import { saveFileInfo } from "../actions"

let ButtonStyles = {
    active: {
        "backgroundColor": "#4AB7FF"
    },
    inactive: {
        "backgroundColor": "#DDE0E4"
    }
}

class CreateNew extends React.Component {
    state = {
        createNew: true,
        fileType: "folder",
        fileName: "",
        creatorName: "",
        size: "",
        date: ""
    }

    componentDidMount() {
        let d = new Date().toString()
        let date = d.substring(4, 15);
        this.setState({ date })
    }

    handleCreateNew = () => {
        let { fileName, creatorName, size, date } = this.state
        let fileInfo = {
            Name: fileName,
            Creator: creatorName,
            Size: size,
            Date: date
        }
        let fileFolderName = fileInfo.Name
        this.props.saveFileInfo(this.state.fileType, fileFolderName, fileInfo, this.props.activeFolder, this.props.allData)
        this.props.changeCreateNew(false)
    }

    render() {
        return (
            <Modal open={this.props.createNew === true}
                onOpen={() => this.props.changeCreateNew(true)}
                onClose={() => this.props.changeCreateNew(false)}>
                <Modal.Description style={{ padding: "5% 30%" }}>
                    <Header>
                        Create New
                        <Icon name="close" size="mini" onClick={() => this.props.changeCreateNew(false)}
                            style={{ float: "right", padding: "2% 20% 0 0" }} /><br /><br />
                    </Header>
                    <Button.Group>
                        <Button onClick={() => this.setState({ fileType: "file" })}
                            style={this.state.fileType === "file" ? ButtonStyles.active : ButtonStyles.inactive} >
                            File</Button>
                        <Button onClick={() => this.setState({ fileType: "folder" })}
                            style={this.state.fileType === "folder" ? ButtonStyles.active : ButtonStyles.inactive}>
                            Folder</Button>
                    </Button.Group><br /><br />

                    <Form>
                        <Form.Field>
                            <input placeholder='Name' value={this.state.fileName} required
                                onChange={e => this.setState({ fileName: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder='Creator' value={this.state.creatorName} required
                                onChange={e => this.setState({ creatorName: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder='Size' value={this.state.size} required
                                onChange={e => this.setState({ size: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder='Date' value={this.state.date} disabled />
                        </Form.Field>
                        <Button type='submit' onClick={() => this.handleCreateNew()}>Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveFileInfo: (fileType, fileFolderName, info, activeFolder, allData) => dispatch(saveFileInfo(fileType, fileFolderName, info, activeFolder, allData))
    }
}

export default connect(null, mapDispatchToProps)(CreateNew);