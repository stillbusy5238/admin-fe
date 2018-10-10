import MUtil from 'util/mm.jsx';

const _mm = new MUtil();




class Product{


 //获取用户列表
  getProductList(listParam){
    let url ='',
        data = {};
    if(listParam.listType === 'list'){
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    }else if (listParam.listType === 'search'){
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.keyword;
    }
    return _mm.request({
      type : 'post',

      url: url,
      data : data


    });

  }
  //获取商品详情
  getProduct(id){
    return _mm.request({
      type : 'post',

      url: '/manage/product/detail.do',
      data : {
        productId: id || 0
      }

    });


  }
  //变更商品销售状态
  setProductStatus(productInfo){
    return _mm.request({
      type : 'post',

      url: '/manage/product/set_sale_status.do',
      data : productInfo


    });

  }

//品类相关
  getCategoryList(parentCategoryId){
    return _mm.request({
      type : 'post',

      url: '/manage/category/get_category.do',
      data : {
        categoryId : parentCategoryId || 0
      }


    });

  }
  //检查表单数据
  checkProduct(product){
    let result = {
      status : true,
      msg: 'success'
    };
    if(typeof product.name !== 'string' || product.name.length === 0 ){
      return {
        status : false,
        msg : 'name cannot be empty'
      }
    }
    if(typeof product.subtitle !== 'string' || product.subtitle.length === 0 ){
      return {
        status : false,
        msg : 'subtitle cannot be empty'
      }
    }

    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)  ){
      return {
        status : false,
        msg : 'plz select'
      }
    }
    if(typeof product.price !== 'number' || !(product.price >= 0) ){
      return {
        status : false,
        msg : 'need price'
      }
    }
    if(typeof product.stock !== 'number' || !(product.stock >= 0)  ){
      return {
        status : false,
        msg : 'need stock'
      }
    }


    return result;




  }
  //保存商品
  saveProduct(product){
    return _mm.request({
      type : 'post',

      url: '/manage/product/save.do',
      data : product

    });


  }
  //根据父品类id获取品类列表
  getCategoryList(parentCategoryId){
    return _mm.request({
      type : 'post',

      url: '/manage/category/get_category.do',
      data : {
        categoryId : parentCategoryId || 0
      }

    });

  }
  //新增品类
  saveCategory(category){
    return _mm.request({
      type : 'post',

      url: '/manage/category/add_category.do',
      data : category

    });


  }
  //修改品类名称
  updateCategoryName(category){
    return _mm.request({
      type : 'post',

      url: '/manage/category/set_category_name.do',
      data : category

    });

  }


}

export default Product;
