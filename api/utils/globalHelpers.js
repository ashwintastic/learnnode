const GlobalHelper = new function(arg){

    this.arrayToObj = function(arg){
     let tempJson = {};
     let counter = 0;
     arg.map((j) => {
         tempJson[++counter] = j
     });
     return tempJson;
    }


};

export default GlobalHelper;