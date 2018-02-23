import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();



import FileUpload from './react-fileupload.jsx';


class FileUploader extends React.Component{
    // constructor(props) {
    //     super(props)
    // }
    // componentDidMount(){
    //
    // }
    render() {
        /*set properties*/
        const options={
            baseUrl         :'/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            accept          : 'image/gif,image/jpeg,image/jpg,image/png',
            dataType        : 'json',
            chooseAndUpload : true,
            uploadSuccess   : (res)=>{this.props.onSuccess(res.data)},
            uploadError     : (err)=>{this.props.onError(err.message || '上传图片出错了');}
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">上传图片</button>
            </FileUpload>
        )
    }
};

export default FileUploader;
