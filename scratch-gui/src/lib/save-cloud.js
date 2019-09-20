import { message, Button } from 'antd'; // antd组件

function dataURItoBlob (dataURI){
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}
export default (filename, productionId, stepId, sb3) => {
    var filedata = ''
    var reader = new FileReader();
    reader.readAsDataURL(sb3);
    reader.onload = function (e) { 
        filedata = this.result;
        if(filedata){
            let  fd = new FormData();
            let binary = dataURItoBlob(filedata)
            fd.append('filedata', binary,); //文件内容：blob
            fd.set('filedata', binary, filename);
            fd.append('production_id', '');
            fd.append('step_id', stepId);
            // fetch("https://api.lzw.limmy.com/v1/scratch/temporary.html",{
            fetch("https://kejiapi.qbitai.com/v1/scratch/temporary.html",{
                method: 'PUT',
                body: fd,
                credentials: 'include'
            }).then(response => {
                // console.log("response:" + response.json())
                return response.json().then((data)=>{
                    if(data.error > 0 ) {
                        message.error(data.msg);
                    }else {
                        message.success('草稿已保存成功');
                    }
                })
            })
        }  
    }
};
