import mkdirp from 'mkdirp';
import GlobalConfig from '../config';
const fs = require('fs');
const Promise = require('bluebird');

class FileUploader {

    async saveFileToDes(fileTosaveDir , file, iCount, storeInternal = true){
        if (storeInternal) {
            return this.saveImage(fileTosaveDir, file, iCount);
        }
    }

    async saveImage(fileTosaveDir,file, iCount=false){
        let filename = iCount;
        return new Promise((resolve, reject) => {
            fs.writeFile(`${fileTosaveDir}/${filename}`, file.buffer, 'binary',  function (err) {
                if (err) reject(false);
                else resolve({type: file.fieldname,  path: `${fileTosaveDir}/${filename}`})
            })
        })
    }

    async saveAllFiles(path , files, userInfo){
        let imagePath = [];
        const allImages = files.length;
        let dirStatus = await this.makeDir(GlobalConfig.imagePath+path,  userInfo.vNumber);
        let fileTosaveDir = GlobalConfig.imagePath+path + '/'+ userInfo.vNumber;
        if (dirStatus) {
            for (let i = 0; i < allImages; i++) {
                imagePath.push( await this.saveFileToDes(fileTosaveDir, files[i], i));
            }
            return {message: true, path: imagePath}
        }
        else{
            return{message:true,  path: "Error with directory creation"}
        }
    }

    async makeDir(parentDirTree, newDir) {
        parentDirTree = parentDirTree + '/';
        return new Promise((resolve, reject) => {
            mkdirp(`${parentDirTree+newDir}`, function (err) {
                if (err) {
                    console.error(err);
                    reject(false)
                }
                else {
                    console.log('directory created !!!!');
                    resolve(true)
                }
            })
        })
    }


}

export default new FileUploader();