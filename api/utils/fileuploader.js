
const fs = require('fs');
const Promise = require('bluebird');
import {appRoot} from '../../server'
class FileUploader {

    async saveFileToDes(file){
        let filename = this.giveAnameToFile();
        return new Promise( (resolve, reject) => {
            fs.writeFile(appRoot+`/storages/vehicleDoc/${filename}`, file.buffer, 'binary', function (err) {
                if (err) reject (false);
                else resolve(true)
            })
        })

    }


    giveAnameToFile(){
        return Date.now();
    }

}

export default new FileUploader();