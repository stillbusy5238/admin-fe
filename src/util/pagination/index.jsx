
import React from 'react'
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
//通用分页
class Pagination extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="row">
        <div className="col-md-12">
          {/* 结构函数 别人怎么传怎么显示*/}
          <RcPagination {...this.props}
           hideOnSinglePage
           showQuickJumper />
        </div>
      </div>
    );
  }

}

export default Pagination;
