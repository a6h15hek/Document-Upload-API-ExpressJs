const cv = require('opencv4nodejs');


const processImage = (filename) => {
    const imageFile = require('../uploads/'+filename);
    let image = cv.imread(imageFile);

    let edges = new cv.Mat();
    cv.Canny(image,edges,100,200);

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(edges,contours,hierarchy,cv.RETR_LIST,cv.CHAIN_APPROX_SIMPLE);

    let cnts = []
    for(let i=0;i<contours.size();i++){
        const tmp = contours.get(i);
        const peri = cv.arcLength(tmp,true);
        let approx = new cv.Mat();
        
        let result = {
            area:cv.contourArea(tmp),
            points:[]
        };

        cv.approxPolyDP(tmp,approx,0.02*peri,true);
        const pointsData = approx.data32S;
        for(let j=0;j<pointsData.length/2;j++)
            result.points.push({x:pointsData[2*j],y:pointsData[2*j+1]});
        
        if(result.points.length===4) cnts.push(result);
        
    }
    cnts.sort((a,b)=>b.area-a.area);

    console.log(cnts);
    //let image = cv.imread($("canvas")[0]);  //Step 1 : reading image using cv
    // let edges = new cv.Mat();
    // cv.Canny(image,edges,100,200);
}

exports.processImage = processImage;

