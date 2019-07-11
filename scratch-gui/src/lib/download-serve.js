import $ from './jquery.min.js';
export default (filename, blob) => {
    window.open(`http://localhost:3000/#/display`)
    // ?url=${data.file}&id=${data.id}`

    var filedata = ''
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) { 
        filedata = this.result.substring(this.result.indexOf(',')+1);
        if(filedata){
            var fd = new FormData();
            fd.append('filedata', filedata);//文件内容：blob
            $.ajax({
                type: 'POST',
                url: "http://kejiadmin.qbitai.com/index.php?r=upload/autosave",
                data: fd ,
                processData: false,
                contentType:false
                // ''
            }).done(function (res) {
                let data = $.parseJSON(res)
                // window.open(`http://localhost:3001/#/display?url=${data.file}&id=${data.id}`)
            })
        }  
    }
};
