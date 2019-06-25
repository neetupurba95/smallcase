export const fetchInitialData = () => (dispatch) => {
    fetch('InitialFolders.json').then(response => {
        response.json().then(data => {
            let response = [];
            let foldersAndFiles = data.root;
            let mainDisplayDetails = {}
            mainDisplayDetails.activeFolder = Object.keys(data)[0]
            mainDisplayDetails.folder = foldersAndFiles["folder"]
            mainDisplayDetails.file = foldersAndFiles["file"]
            let activeFolder = foldersAndFiles["folder"]
            Object.keys(activeFolder).forEach((item, index) => {
                let obj = {};
                obj.folderName = item
                obj.index = index + 1;
                response.push(obj)
            })
            dispatch({ type: "FETCHING_DATA_FROM_JSON", response: response })
            dispatch({ type: "DISPLAYING_DATA", response: mainDisplayDetails })
        })
    })
}

export const getFolderDetails = (folderData, folderName) => (dispatch) => {
    if (folderData.folder) {
        let reqData = folderData.folder[folderName]
        reqData.activeFolder = folderName
        dispatch({ type: "DISPLAYING_DATA", response: reqData })
    }
}

export const goOneFolderUp = (allData, path) => (dispatch => {
    let response = allData.find(data => data.activeFolder === path)
    let mainDisplayDetails = {}
    if (path === "root") {
        mainDisplayDetails.activeFolder = response.activeFolder
        mainDisplayDetails.folder = response.activeFolderData.folder
    }
    else {
        mainDisplayDetails = response.activeFolderData
    }
    dispatch({ type: "DISPLAYING_DATA", response: mainDisplayDetails })
})

export const saveFileInfo = (fileType, fileFolderName, info, activeFolder, allData) => dispatch => {
    let reqData;
    for (let item of allData) {
        if (item.activeFolder === activeFolder) {
            reqData = item;
            break;
        }
    }
    let response;
    if (reqData.activeFolderData[fileType]) {
        let f = reqData.activeFolderData[fileType]
        f[info.Name] = { fileInfo: info }
        response = reqData.activeFolderData
    }
    else {
        reqData.activeFolderData[fileType] = info
        response = reqData
    }
    dispatch({ type: "DISPLAYING_DATA", response: response })
}

export const deleteFile = (item, fileType, allData, fullPath) => dispatch => {
    let pathToDelete;
    if (fullPath[0] === "root") {
        pathToDelete = "root";
        allData.map(f => {
            if (f.activeFolder === pathToDelete) {
                delete f.activeFolderData[fileType][item]
            }
        })
    }
}
