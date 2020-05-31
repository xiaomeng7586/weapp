import { ComponentClass } from 'react'
import Taro, { Component, Config, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabBar,AtButton, AtTabsPane  } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'
import "taro-ui/dist/style/components/button.scss";
import  Home  from '../home/home'
import './login.scss';

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
  current:number,
  name:String,
  loading:boolean|undefined,
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  
}

type PageOwnProps = {}
type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & isState

interface Login {
  props: IProps;
}



@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
 
}))
class Login extends Component<{},isState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  constructor(props){
    super(props)
    this.state={
      name:"",
      current:0,
      loading:false,
    }
  }
  handleClick (value:number) {
    this.setState({
      current: value
    })
    console.log(this.state.current)
  }
  config: Config = {
    navigationBarTitleText: '我的地盘'
  }
  tobegin(res){
    if(res.detail.userInfo){ // 返回的信息中包含用户信息则证明用户允许获取信息授权
      console.log('授权成功')
      // 保存用户信息微信登录
      Taro.setStorageSync('userInfo', res.detail.userInfo)
      Taro.login()
        .then(resLogin => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (resLogin.code){
              console.log(resLogin)
            // 登录
            // Taro.setStorageSync('token', resLogin)
            // _login({...res.detail, code: resLogin.code},(result) => {
            //   if (result.data.status === 200){
            //     // 设置 token
            //     Taro.setStorageSync('token', result.data.data.token)
            //     // 登录成功返回首页并刷新首页数据
            Taro.navigateTo({
                url:"/pages/index/index"
            })
            //   } else {
            //     Taro.showToast({
            //       title: '登录失败，请稍后重试',
            //       icon: 'none',
            //       mask: true
            //     })
            //   }
            // }, () => {
            //   Taro.showToast({
            //     title: '登录失败，请稍后重试',
            //     icon: 'none',
            //     mask: true
            //   })
            // })
          }
         
        })
    } else {
        Taro.navigateTo({
            url:"/pages/index/index"
        })
    }
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
   
  }

  componentWillUnmount () { 
    
  }
  componentDidmount () {
    
  }
  componentDidShow () { 
    this.setState({
      name: "hello world3!!!!"
    })
  }
  componentDidHide () { }
  
  render () {
    return (
        <View className='login body'>
        <View className='textAlign need'>需要使用你的微信昵称和头像</View>
        <AtButton
          className='at-col defaultWidth button'
          openType='getUserInfo'
          onGetUserInfo={this.tobegin}
        >
          点击授权
        </AtButton>
        <AtButton
          type='secondary'
          className='at-col defaultWidth'
          onClick={() => Taro.switchTab({url: '../index/index'})}
        >
          暂不登录
        </AtButton>
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

export default Login as ComponentClass<PageOwnProps, PageState>
