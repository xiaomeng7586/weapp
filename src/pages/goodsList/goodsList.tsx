import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import 'taro-ui/dist/style/index.scss'
// import "taro-ui/dist/style/components/tabs.scss";
import { add, minus, asyncAdd } from '../../actions/counter'


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
    mainText:string
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}
type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & isState

interface GoodsList {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), () => ({
  
}))
class GoodsList extends Component<{},isState> {

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
      mainText:""
    }
  }
  config: Config = {
    navigationBarTitleText: '我的百科'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
    
  }
  componentWillMount (){
      this.setState({
          mainText:this.$router.params.value
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
    return (
        <View className='at-article'>
        <View className='at-article__h1'>
          {this.state.mainText}
        </View>
        {/* <View className='at-article__info'>
          2017-05-07 孟程厂
        </View> */}
        <View className='at-article__content'>
          <View className='at-article__section'>
            {/* <View className='at-article__h2'>{this.state.mainText}</View> */}
            {/* <View className='at-article__h3'>{this.state.mainText}</View> */}
            <View className='at-article__p'>
            邓紫棋（Gloria Tang Tsz-Kei），又名G.E.M.（“Get Everybody Moving”的简称） [1]  ，本名邓诗颖，1991年8月16日生于中国上海，4岁移居香港，中国香港女歌手、词曲创作人 [2]  。
            </View>
            <View className='at-article__p'>
            2008年，以16岁之龄出道。同年10月，发行首张音乐EP《G.E.M.》，取得香港各大乐坛颁奖礼新人金奖 [3-4]  。2011年5月，以19岁之龄在香港红馆举办5场个人演唱会 [5]  。2012年，凭借音乐专辑《Xposed》，获得IFPI香港唱片销量大奖全年最高销量女歌手奖、最高销量国语唱片奖 [6]  ，并入围第24届金曲奖最佳国语女歌手奖 [7]  。2014年，参加湖南卫视《我是歌手第二季》节目，最终获得总决赛亚军 [8]  ；同年3月，获第27届KCA美国儿童选择奖“最受欢迎亚洲艺人” [9]  ；12月，邓紫棋的蜡像入驻香港杜莎夫人蜡像馆 [10]  。2015年2月，参加2015年中央电视台春节联欢晚会，自弹自唱其原创歌曲《多远都要在一起》 [11]  ；5月，登福布斯中国名人榜，排名第11位 [12]  ；7月，未满24岁便完成80场个人演唱会 [13]  ；8月，成为首位在瑞士阿尔卑斯山脉少女峰举办音乐会的中国音乐人 [14]  。2016年，入选《福布斯》“全球30岁以下最具潜力30名杰出音乐人”榜单 [15]  ；获MTV欧洲音乐奖“中国内地及香港地区最佳艺人奖” [16]  。 2018年11月，受邀担任美国NASA“科学突破奖”颁奖典礼颁奖及表演嘉宾，演唱个人原创歌曲《光年之外》 [17]  ；随后，入选BBC“年度百大女性” [18]  。2019年12月，推出音乐专辑《摩天动物园》 [19]  。
            </View>
            <Image 
              className='at-article__img' 
              src='http://www.mengchengchang.com/wxImg/gem8.png' 
              mode='widthFix' />
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

export default GoodsList as ComponentClass<PageOwnProps, PageState>
