// Define a global variable 'Module' with a method 'onRuntimeInitialized'
 var $ = require('jquery');
 require('ajax');
 

  // Load 'opencv.js' assigning the value to the global variable 'cv'
  $.ajax({
    url: 'opencv.js',
    dataType: 'script',
    async: false
});

const processImage = (filename) => {
     //var s = new cv.ImageStream()
    // let image1 = cv.readImage("../uploads/1603772057589-6-docuemntFile.PNG", function(err, im){
    //     console.log("worked");
    //   });
    //console.log(cnts);
    //let image = cv.imread($("canvas")[0]);  //Step 1 : reading image using cv
    // let edges = new cv.Mat();
    // cv.Canny(image,edges,100,200)
}

exports.processImage = processImage;
