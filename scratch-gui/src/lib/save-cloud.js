import $ from './jquery.min.js';
export default (filename, blob) => {
    // window.open(`http://localhost:3000/#/display`)
    // ?url=${data.file}&id=${data.id}`
    var filedata = ''
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) { 
        filedata = this.result.substring(this.result.indexOf(',')+1);
        if(filedata){
            var fd = new FormData();
            fd.append('filedata', filedata);//文件内容：blob
            fd.append('id', '111');//文件内容：blob
            fetch("https://kejiapi.qbitai.com/v1/scratch/workhome.html",{
                method: 'PUT',
                body: fd
            }).then(response => {
                console.log("response:" + JSON.stringify(response))
            }).then(error => {
                console.error('Error', error)
            })
            // $.ajax({
            //     type: 'PUT',
            //     url: "https://kejiapi.qbitai.com/v1/scratch/workhome.html",
            //     data: fd ,
            //     processData: false, // 是否序列化data
            //     contentType:false
            //     // ''
            // }).done(function (res) {
            //     let data = $.parseJSON(res)
            //     // window.open(`http://localhost:3001/#/display?url=${data.file}&id=${data.id}`)
            // })
        }  
    }
};
