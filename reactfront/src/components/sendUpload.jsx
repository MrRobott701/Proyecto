export function sendUpload(e) {
  return new Promise((resolve, reject) => {
    var file = e.target.files[0] 
    var reader = new FileReader() 
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function (e) { 
      var rawLog = reader.result.split(',')[1];
      var dataSend = { 
        dataReq: { data: rawLog, name: file.name, type: file.type }, 
        fname: "uploadFilesToGoogleDrive" 
      };
      
      fetch('https://script.google.com/macros/s/AKfycbwOLV2-ZctRlQrV41mzL-YXqmGLqg8_kAlIkT0vAFyYAQ3iz_CD7J3Vd2OJMDk065os/exec', 
        { method: "POST", body: JSON.stringify(dataSend) })
      .then(res => res.json())
      .then((a) => {
        console.log(a);
        resolve(a.url);
      })
      .catch(e => {
        console.log(e);
        reject(e);
      });
    }
  });
}
