 let extensions = {
    media : [".mp4",".mkv",".jpg"],
    archives:[".rar",".7z",".tar",".iso",".ar"],
    documents:[".pdf",".docx",".doc",".odt",".jfif",".odg",".txt"],
    app:[".exe",".pkg",".deb"]
} 


let fs = require("fs");
let path = require("path");

let input = process.argv.slice(2)[0];
let allEntities = fs.readdirSync(input); 

 for(let i=0 ; i<allEntities.length ; i++){
     let name = allEntities[i]
     let filePath = path.join(input,name);
     let stat = fs.lstatSync(filePath).isFile();
      if(stat==true){
        let extName = checkExt(allEntities[i],filePath);
          console.log(""+allEntities[i]);   
          console.log("Extension is : " + extName + "\n");  
            
           makeExtensionFolder(extName , extensions , name);
           console.log("Files Are Copied ");
      }
 }
  
  function checkExt(element , elementPath){
        let extName = path.extname(elementPath);
        return extName;
  }

  function makeExtensionFolder(extensionName  , extensionArray , name){
       let destination = path.join(input , "organized");
       let destinationLocation = fs.existsSync(destination);
       //console.log("destination path : "+destinationLocation);
            if(destinationLocation==false){
                fs.mkdirSync(destination);
            }
        for(let type in extensionArray){            
            let element = extensionArray[type];
                for(let k=0 ; k<element.length ; k++){
                     if(extensionName==element[k]){
                         let typePath = path.join(destination,type);
                        let typePathPresent = fs.existsSync(typePath);
                             if(typePathPresent==false){
                                  fs.mkdirSync(typePath);
                             }
                     let sPath = path.join(input , name); 
                     let dPath = path.join(typePath,name);
                     fs.copyFileSync(sPath,dPath);                     
                            
                     }
                }
         }
   }
  