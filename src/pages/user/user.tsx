import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtGrid  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import "taro-ui/dist/style/components/grid.scss";
// import 'taro-ui/dist/style/index.scss'
// import "taro-ui/dist/style/components/tabs.scss";

import './user.scss';

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

interface userInfo {
    avatarUrl:string,
    city: string,
    country: string,
    gender: number,
    language: string,
    nickName: string,
    province: string,
}
type isState = {
  userInfo:userInfo
}



type PageOwnProps = {}
type PageState = {}

type IProps = PageStateProps  & PageOwnProps & isState

interface User {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
 
}))
class User extends Component<{},isState> {

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
        userInfo:{
            avatarUrl:"",
            city: "",
            country: "",
            gender:1,
            language: "",
            nickName: "",
            province: "",
        }
    }
  }
  config: Config = {
    navigationBarTitleText: '个人中心'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
    
  }
  componentWillMount (){
      let userInfo = Taro.getStorageSync("userInfo")
      this.setState({
        userInfo:userInfo
      })
  }
  componentWillUnmount () { 
    
  }
  componentDidmount () {
    
  }
  componentDidShow () { 
    
  }
  componentDidHide () { }
  
  render () {
    const gridData=[
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/ulogo1.png',
            value: '待付款',
            number:0
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/ulogo2.png',
            value: '待发货',
            number:22
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/ulogo3.png',
            value: '待收货',
            number:0
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/ulogo4.png',
            value: '待评价',
            number:0
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/ulogo5.png',
            value: '我的订单',
            number:0
        },
    ]
    const gridList=gridData.map(item=>{
        return <View className="grid_item" key={item.value}>
            <Image className="image" src={item.image}/>
    {item.number>0&&(<View className="grid_number">{item.number}</View>)}
            <View className='item_title'>{item.value}</View>
        </View>
    })
    const moneyData=[
        {
            image: '',
            value: '余额',
            text:"909052.64"
        },
        {
            image: '',
            value: '优惠券',
            text:"102"
        },
        {
            image: '',
            value: '积分',
            text:"57577"
        },
        {
            image: '',
            value: '可提现',
            text:"50000.00"
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/money.png',
            value: '我的钱包',
            text:""
        },
    ]
    const moneyList=moneyData.map((item,index)=>{
        return <View className="grid_item" key={item.value}>
            {index<4&&(<View className='item_text'>{item.text}</View>)}
            {index==4&&(<Image className="image" src={item.image}/>)}
            <View className='item_title'>{item.value}</View>
        </View>
    })
    const oprateData=[
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use1.png',
            value: '足迹'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use2.png',
            value: '会员'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use3.png',
            value: '收藏'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use4.png',
            value: '分销'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use5.png',
            value: '消息'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use6.png',
            value: '设置'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use7.png',
            value: '客服'
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/use8.png',
            value: '帮助'
        },
    ]
    const oprateList=oprateData.map(item=>{
        return <View className="oprate_item" key={item.value}>
            <Image className="image" src={item.image}/>
            <View className='item_title'>{item.value}</View>
        </View>
    })
    const goodsData=[
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/close1.png',
            value: '女士白色长颈鹿T恤 白色长颈鹿T恤 小清新',
            money:"￥69.00"
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/close2.png',
            value: '女士黑色长裤子',
            money:"￥21.00"
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/close2.png',
            value: '女士黑色长裤子',
            money:"￥31.00"
        },
        {
            image: 'http://www.mengchengchang.com/wxImg/userInfo/close1.png',
            value: '女士白色长颈鹿T恤',
            money:"￥69.00"
        },
    ]
    const goodsList=goodsData.map(item=>{
        return <View className="goods_item" key={item.value}>
            <Image className="image" src={item.image}/>
            <View className='item_title'>{item.value}</View>
            <View className='item_money'>{item.money}</View>
        </View>
    })
    return (
      <View className='User'>
        <View className="user_info">
            <View className="avatar_box">
                <Image className="image" src={this.state.userInfo.avatarUrl}></Image>
            </View>
            <View className="user_name">
                <View className="name">
                    <View className="nick_name">{this.state.userInfo.nickName}</View>
                    <View className="server">成为服务中心</View>
                </View>
                <View className="vip_box">
                    <View className="item">钻石会员</View>
                    <View className="item">打卡签到</View>
                </View>
            </View>
            <View className="qr_code"></View>
        </View>
        <View className="order_from">
            {gridList}
        </View>
        <View className="order_from">
            {moneyList}
        </View>
        <View className="oprate_from">
            {oprateList}
        </View>
        <View className="recommend">
            <View className="title">
                <View className="title_text">人气推荐</View>
                <View className="title_image">
                    <Image className="image" src="http://www.mengchengchang.com/wxImg/userInfo/arror.png"></Image>
                </View>
            </View>
            <View className="goods_from">
                {goodsList}
            </View>
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

export default User as ComponentClass<PageOwnProps, PageState>
