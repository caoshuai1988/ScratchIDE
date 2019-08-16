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
export default (filename, sb3) => {
    // window.open(`http://localhost:3000/#/display`)
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
            fd.append('title', 'test作业01');
            fd.append('details', 'testtesttesttesttest');
            fd.append('imgdata', '');// 用户上传封面
            fd.append('step_id', '1');
            fd.append('source_code', '1'); //允许 1 不允许2
            fd.append('status', '2'); // 公开分享
            fd.append('img_url', 'https://test123-1256342805.cos.ap-chengdu.myqcloud.com/%E6%98%9F%E7%90%83%E8%83%8C%E6%99%AF-%E5%8A%A8%E7%94%BB.png');
            fetch("https://kejiapi.qbitai.com/v1/scratch/workhome.html",{
                method: 'PUT',
                body: fd
            }).then(response => {
                console.log("response:" + JSON.stringify(response))
            })
        }  
    }
};
