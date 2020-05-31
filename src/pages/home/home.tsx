import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar  } from 'taro-ui'
import { connect } from '@tarojs/redux'
// import 'taro-ui/dist/style/index.scss'
// import "taro-ui/dist/style/components/tabs.scss";
import { add, minus, asyncAdd } from '../../actions/counter'

import './home.scss';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}


type isState = {
  searchValue:string
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}
type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & isState

interface Home {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Home extends Component<{},isState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  static options = {
    addGlobalClass: true
  }
  constructor(props){
    super(props)
    this.state={
      searchValue:"邓紫棋"
    }
  }
  toGoodsList(){
    Taro.navigateTo({
      url:"/pages/goodsList/goodsList?value="+this.state.searchValue
    })
  }
  onChange (value) {
    this.setState({
      searchValue: value
    })
  }
  config: Config = {
    navigationBarTitleText: '首页'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
    
  }
  componentWillMount (){
      
  }
  componentWillUnmount () { 
    
  }
  componentDidmount () {
    
  }
  componentDidShow () { 
    
  }
  componentDidHide () { }
  
  render () {
    let itemTabsList=[
      {
        title:"购物车",
        src:"http://www.mengchengchang.com/ttimg/item_icon1.png"
      },
      {
        title:"优惠券",
        src:"http://www.mengchengchang.com/ttimg/item_icon2.png"
      },
      {
        title:"我的订单",
        src:"http://www.mengchengchang.com/ttimg/item_icon3.png"
      },
      {
        title:"我的收藏",
        src:"http://www.mengchengchang.com/ttimg/item_icon4.png"
      },
    ]
    const itemElement=itemTabsList.map((item)=>{
      return <View className='item_element' key={item.title}><Image onClick={this.toGoodsList} className="image" src={item.src}/><View className='item_title'>{item.title}</View></View>
    })
    let commodityList=[
      {
        id:1,
        src:"http://www.mengchengchang.com/ttimg/commodity1.png"
      },
      {
        id:2,
        src:"http://www.mengchengchang.com/ttimg/commodity2.png"
      },
      {
        id:3,
        src:"http://www.mengchengchang.com/ttimg/commodity3.png"
      },
      {
        id:4,
        src:"http://www.mengchengchang.com/ttimg/commodity4.png"
      },
      {
        id:1,
        src:"http://www.mengchengchang.com/ttimg/commodity1.png"
      },
      {
        id:2,
        src:"http://www.mengchengchang.com/ttimg/commodity2.png"
      },
      {
        id:3,
        src:"http://www.mengchengchang.com/ttimg/commodity3.png"
      },
      {
        id:4,
        src:"http://www.mengchengchang.com/ttimg/commodity4.png"
      },
      {
        id:1,
        src:"http://www.mengchengchang.com/ttimg/commodity1.png"
      },
      {
        id:2,
        src:"http://www.mengchengchang.com/ttimg/commodity2.png"
      },
      {
        id:3,
        src:"http://www.mengchengchang.com/ttimg/commodity3.png"
      },
      {
        id:4,
        src:"http://www.mengchengchang.com/ttimg/commodity4.png"
      },
      {
        id:1,
        src:"http://www.mengchengchang.com/ttimg/commodity1.png"
      },
      {
        id:2,
        src:"http://www.mengchengchang.com/ttimg/commodity2.png"
      },
      {
        id:3,
        src:"http://www.mengchengchang.com/ttimg/commodity3.png"
      },
      {
        id:4,
        src:"http://www.mengchengchang.com/ttimg/commodity4.png"
      },
    ]
    const itemCommodity=commodityList.map((item)=>{
      return <View className='commodity_element' key={item.id}><Image className="image" src={item.src}/></View>
    })
    return (
      <View className='home'>
          <View className="banner">
            <View className='banner_img'>
            <Image className="image" src="http://www.mengchengchang.com/ttimg/banner.png" />
            </View>
            <AtSearchBar
              actionName='搜索'
              className="search_bar"
              customStyle="
              position: absolute;
              left: 20px;
              top: 0px;
              width: calc(100% - 40px);
              z-index: 2;
              height: 60px;
              background-color:transparent"
              value={this.state.searchValue}
              onChange={this.onChange.bind(this)}
            />
              
          </View>
          <View className='item_tabs'>
              {itemElement}
          </View>
          <View className='commodity'>
              {itemCommodity}
          </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Home as ComponentClass<PageOwnProps, PageState>
