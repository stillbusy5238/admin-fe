import React from 'react';

import {Link} from 'react-router-dom';
import './index.scss';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      list: [],
      pageNum : 1,
      listType : 'list'
    }

  }

  componentDidMount(){
    this.loadProductList();
  }
  //加载商品列表
  loadProductList(){
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索,需要传入搜索类型和搜索关键字
    if(this.state.listType === 'search'){
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;

    }
    _product.getProductList(listParam).then(res => {
      this.setState(res);
    }, errMsg => {
      this.setState({
        list : []
      })
      _mm.errorTips(errMsg)
    });
  }
  //搜索
  // onSearch(searchType, searchKeyword){
  //
  //   let listType = searchKeyword ==='' ? 'list' : 'search';
  //   this.setState({
  //     listType : listType,
  //     pageNum : 1,
  //     searchType : searchType,
  //     searchKeyword: searchKeyword
  //
  //   }, ()=>{
  //     this.loadProductList();
  //   });
  // }
  onSearch(searchType, searchKeyword){
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType : listType,
      pageNum : 1,
      searchType : searchType,
      searchKeyword : searchKeyword
    },()=>{
      this.loadProductList();
    });

  }
  //页数发生变化的时候
  onPageNumChange(pageNum){
    this.setState({
      pageNum : pageNum
    },() =>{
      this.loadProductList();
    });
  }

  onSetProductStatus(e,productId,currentStatus){
    let newStatus = currentStatus == 1 ? 2 : 1;
    let confirmTips = currentStatus == 1 ? 'outstack ?': 'onsale ?';
    if(window.confirm(confirmTips)){
      // console.log(productId);
      _product.setProductStatus({
        productId : productId,
        status : newStatus
      }).then(res =>{
        _mm.successTip(res);
        this.loadProductList();
      },errMsg =>{
        _mm.errorTips(errMsg);
      });

    }
  }

  render(){
    let tableHeads = [
      {name: 'productID', width: '10%'},
      {name: 'productInfo', width: '50%'},
      {name: 'price', width: '10%'},
      {name: 'status', width: '15%'},
      {name: 'opear', width: '15%'},

    ];


    return(
      <div id="page-wrapper">
        <PageTitle title="商品列表">
          <div className="page-header-right">

            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>

        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((product, index)=>{
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                      <p>{product.name}</p>
                      <p>{product.subtitle}</p>

                    </td>
                    <td>{product.price}</td>
                    <td>
                      <p>{
                        product.status == 1 ? 'onsale' : 'outstack'
                      }</p>
                      <button className="btn btn-warning btn-xs" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status == 1 ? 'outstack' : 'onsale'}</button>
                    </td>
                    <td>
                      <Link className="opear" to={'/product/detail/' + product.id}>detail</Link>
                      <Link className="opear" to={'/product/save/' + product.id}>change</Link>
                    </td>

                  </tr>
                );

              })
          }

        </TableList>

        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=> this.onPageNumChange(pageNum)}/>
      </div>


    );
  }
}

export default ProductList;
