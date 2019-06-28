import $ from './jquery.min.js';
export default (filename, blob) => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    
    // Use special ms version if available to get it working on Edge.
    // if (navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveOrOpenBlob(blob, filename);
    //     return;
    // }

    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.style.display = "none"; 
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);

    // var filedata = ''
    // var reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onload = function (e) { 
    //     filedata = this.result.substring(this.result.indexOf(',')+1);
    //     if(filedata){
    //         var fd = new FormData();
    //         fd.append('filedata', filedata);//文件内容：blob
    //         $.ajax({
    //             type: 'POST',
    //             url: "http://kejiadmin.qbitai.com/index.php?r=upload/autosave",
    //             data: fd ,
    //             processData: false,
    //             contentType:false
    //             // ''
    //         }).done(function (data) {
    //             //data: 服务器返回的数据
    //             //TODO ......
    //         })
    //     }  
    // }
};
