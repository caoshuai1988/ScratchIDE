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

  /**redux 项目信息更新 */
function getCurWorkInfo(id, props) {
    const url = 'https://kejiapi.qbitai.com/v1/works/detail.html?id='+id
    fetch(url,{
        method:'GET',
        credentials: "include",
    }).then((res)=>{
        return res.text()
    }).then((res)=>{
        let response = JSON.parse(res)
        if(response.error === 0) {
            props.onSavePrograWorkInfo(response.data)
        }else {
            message.error(response.msg)
        }
    })
}
export default (work, sb3, props) => {
    var filedata = ''
    var reader = new FileReader();
    reader.readAsDataURL(sb3);
    reader.onload = function (e) { 
        filedata = this.result;
        if(filedata){
            let  fd = new FormData();
            let binary = dataURItoBlob(filedata)
            fd.append('filedata', binary); //文件内容：blob
            fd.set('filedata', binary, work.fileName);
            fd.append('title', work.fileName);
            fd.append('details', work.details);
            fd.append('imgdata', work.imgdata!==""?work.imgdata: '');// 用户上传封面
            fd.append('step_id', work.stepId);
            fd.append('source_code', work.source_code);
            fd.append('status', work.status);
            fd.append('img_url', work.img_url);
            fetch("https://kejiapi.qbitai.com/v1/scratch/workhome.html",{
                method: 'PUT',
                body: fd
            }).then(response => {
                return response.json().then((data)=> {
                    if(data.code > 0) {
                        message.error(data.msg)
                    }else {
                        message.success('作品发布成功')
                        getCurWorkInfo(data.data.file_id , props)
                    }
                })    
            })
        }  
    }
};
