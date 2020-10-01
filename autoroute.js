var _getAllFilesFromFolder = function(dir) {

    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });
    // console.log(results)
    let paths=[]
    let names=[]
    let routers=[]
    results.forEach(e=>{
        var split = e.split('.')[1]
        split=split.toLowerCase();
        paths.push(split)
        split=split.replace('/pages','');
        routers.push(split);
        split = split.split('/')
        split.splice(0, 1);
        split=split.join('')
        names.push(split)
        // console.log(split)
      })
      let importnya="";
      let routernya = "";
      paths.forEach((e,i)=>{
          importnya=importnya+`import ${names[i]} from '.${paths[i]}' 
`
          routernya=routernya+`{path:'${routers[i].indexOf('_')!=-1?routers[i].replace('_',':'):routers[i].indexOf('/index')!=-1?routers[i].replace('/index','/'):routers[i]}',component:${names[i]}}, 
`;
      })
      console.log(importnya)
      console.log(routernya)
    return results;
};
(function(){
    _getAllFilesFromFolder("./pages");
})()