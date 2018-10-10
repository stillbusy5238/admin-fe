import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import './detail.scss';

import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';




const _mm = new MUtil();
const _order = new Order();





class OrderDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      orderNumber:       this.props.match.params.orderNumber,
      orderInfo  : {}

    }
  }
  componentDidMount(){
    this.loadOrder();

  }

  //加载商品详情
  loadOrder(){
    //有id的时候需要编辑

      _order.getOrder(this.state.orderNumber).then((res)=>{


        this.setState({
          orderInfo : res
        });

      },(errMsg)=>{
        _mm.errorTips(errMsg)

      });

  }
  //发货
  onSendGoods(){
    if(window.confirm('是否发货')){
      _order.sendGoods(this.state.orderNumber).then((res)=>{
        _mm.successTip('发货成功');
        this.loadOrder();
      },(errMsg)=>{
        _mm.errorTips(errMsg);
      });
    }

  }








   render(){
     let receiverInfo    = this.state.orderInfo.shippingVo       || {};
     let productList = this.state.orderInfo.orderItemVoList || [];
     let tableHeads = [
       {name: '商品图片', width: '10%'},
       {name: '商品信息', width: '45%'},
       {name: '单价', width: '15%'},
       {name: '数量', width: '15%'},
       {name: '合计', width: '15%'},

     ];

    return(

      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
            <div className="form-group">
              <label  className="col-sm-2 control-label">orderNo</label>
              <div className="col-md-5">
                <p className="form-control-static">{this.state.orderInfo.orderNo}</p>

              </div>
            </div>
            <div className="form-group">
              <label  className="col-sm-2 control-label">Time</label>
              <div className="col-md-5">
                <p className="form-control-static">{this.state.orderInfo.createTime}</p>

              </div>
            </div>

            <div className="form-group">
              <label  className="col-sm-2 control-label">Name</label>
              <div className="col-md-5">
                <p className="form-control-static">
                  {this.state.orderInfo.receiverName}，
                  {receiverInfo.receiverProvince}
                  {receiverInfo.receiverCity}，
                  {receiverInfo.receiverAddress}，
                  {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                </p>

              </div>
            </div>

            <div className="form-group">
              <label  className="col-sm-2 control-label">status</label>
              <div className="col-md-5">
                <p className="form-control-static">
                  {this.state.orderInfo.statusDesc}
                  {
                    this.state.orderInfo.status === 20 ?
                    <button className="btn btn-default btn-sm btn-send-goods"
                      onClick={(e)=>{this.onSendGoods(e)}}>发货</button>
                    :null
                  }
                </p>

              </div>
            </div>
            <div className="form-group">
              <label  className="col-sm-2 control-label">payment</label>
              <div className="col-md-5">
                <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>

              </div>
            </div>

            <div className="form-group">
              <label  className="col-sm-2 control-label">Price</label>
              <div className="col-md-5">
                <p className="form-control-static">${this.state.orderInfo.payment}</p>

              </div>
            </div>
            <div className="form-group">
              <label  className="col-sm-2 control-label">detail</label>
              <div className="col-md-10">
                <TableList tableHeads={tableHeads}>
                  {
                    productList.map((product, index)=>{
                        return (
                          <tr key={index}>
                            <td>
                              <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productName}/>
                            </td>
                            <td>
                              {product.productName}


                            </td>

                            <td>${product.currentUnitPrice}</td>
                            <td>{product.quantity}</td>
                            <td>
                              {product.totalPrice}
                            </td>


                          </tr>
                        );

                      })
                  }

                </TableList>


              </div>
            </div>


          </div>
      </div>






    );
  }

}

export default OrderDetail;
