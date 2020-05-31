import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabBar,AtTabs, AtTabsPane  } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import { add, minus, asyncAdd } from '../../actions/counter'
import  Home  from '../home/home'
import User from '../user/user'
import './index.scss';

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
  name:String
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  
}

type PageOwnProps = {}
type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & isState

interface Index {
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
class Index extends Component<{},isState> {

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
      current:3
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
      <View className='index'>
        {this.state.current==0 && <Home></Home>}
        {this.state.current==3 && <User></User>}
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home'},
            { title: '分类', iconType: 'filter', text: 'new' },
            { title: '购物车', iconType: 'shopping-cart', text: 'new' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
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

export default Index as ComponentClass<PageOwnProps, PageState>
