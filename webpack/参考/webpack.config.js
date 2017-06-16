var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    style: './src/js/style.js',                         // 公共样式(style)入口
    dialogue: './src/js/dialogue.js',                   // 聊天页面入口
    index: './src/js/index.js',                         //首页页面入口
    queue: './src/js/queue.js',                         //排队页面入口
    orderTaking: './src/js/orderTaking.js',             //开始接单页面入口
    selfDoc: './src/js/selfDoc.js',                     //自建单据页面入口
    docHandle: './src/js/docHandle.js',                 //单据处理页面入口
    upGrade: './src/js/upGrade.js',                     //一线客服处理页面入口
    documentDetails : './src/js/documentDetails.js',    //单据详情页面入口
    IMconfig: './src/js/IMconfig.js',                   //设置-IM在线配置页面入口
    setDepartList: './src/js/setDepartList.js',         //设置-部门列表页面入口
    setFieldList: './src/js/setFieldList.js',           //设置-工单字段页面入口
    setField: './src/js/setField.js',                   //设置-工单字段-新增字段页面入口
    setFieldInput: './src/js/setFieldInput.js',         //设置-工单字段-新增字段-添加工单字段：文本框页面入口
    setCreateGame: './src/js/setCreateGame.js',         //设置-创建游戏-新增游戏页面入口
    setEditGame: './src/js/setEditGame.js',             //设置-创建游戏-编辑游戏页面入口
    setGameList: './src/js/setGameList.js',             //设置-业务配置-游戏列表页面入口
    qualityTest: './src/js/qualityTest.js',             //质检单据页面入口
    chargeback: './src/js/chargeback.js',               //退单提交页面入口
    setDocumentList: './src/js/setDocumentList.js',     //设置-帮助中心-FAQ资料列表页面入口
    setDefaultQS: './src/js/setDefaultQS.js',           //设置-默认问题分类配置页面入口
    setQuestionSort: './src/js/setQuestionSort.js',     //设置-问题分类配置页面入口
    setPowerMenu: './src/js/setPowerMenu.js',           //设置-权限菜单页面入口
    powerMenuList: './src/js/powerMenuList.js',         //设置-权限列表页面入口
    setQTError: './src/js/setQTError.js',               //设置-质检错误原因页面入口
    setRoleList: './src/js/setRoleList.js',             //设置-角色列表页面入口
    documentQuery : './src/js/documentQuery.js',        //单据查询页面入口
    setFieldSort:'./src/js/setFieldSort.js',            //工单分类配置页面入口
    setCompany: './src/js/setCompany.js',               //公司列表入口
    VIPLevelConfig:'./src/js/VIPLevelConfig.js',        //VIP等级配置页面入口
    userList:'./src/js/userList.js',                    //客户管理列表页面入口
    blackList:'./src/js/userList.js',                   //黑名单管理页面入口
    SDKConfig:'./src/js/SDKConfig.js',                  //移动sdk配置页面入口
    setQualitySort:'./src/js/setQualitySort.js',        //质检分类列表页面入口
    organList:'./src/js/organList.js',                  //对内—模板管理-组织架构列表页面入口
    organiseOut:'./src/js/organiseOut.js',              //对外-模板-组织架构页面入口
    fieldList:'./src/js/fieldList.js',                  //预览工单页面入口
    configOut:'./src/js/configOut.js',                  //对外设置页面入口
    faqOut:'./src/js/faqOut.js',                        //对外—模板-FAQ
    gameIndex:'./src/js/gameIndex.js',                  //对外—游戏-游戏列表
    setGameQS:'./src/js/setGameQS.js',                  //对外—游戏-游戏问题分类
    roleList:'./src/js/roleList.js',                    //对外角色列表
    manageCompany:'./src/js/manageCompany.js',          //对外公司
    masterlogin:'./src/js/masterlogin',                 //登录页面-对内
    serverlogin:'./src/js/serverlogin.js',              //登录页面-对外
    defaultQuest:'./src/js/defaultQuest.js',            //对内-模板-游戏问题
    configClass:'./src/js/configClass.js',              //对内-配置分类
    configOutClass:'./src/js/configOutClass.js',        //对外-配置分类
    configIndex:'./src/js/configIndex.js',              //对内-配置    
    configOutIndex:'./src/js/configOutIndex.js',        //对外-配置
    gameQuestOut:'./src/js/gameQuestOut.js',            //对外-游戏问题
    fieldOut:'./src/js/fieldOut.js',                    //工单字段页面-对外
    setPublic:'./src/js/setPublic.js',                  //多个页面引用setDepart.css的样式
    player:'./src/js/player.js',                        //对外-玩家列表
    langList:'./src/js/langList.js',                    //对内-语言列表
    publicRole:'./src/js/publicRole.js',                //多个页面引用setRoleList.css的样式
    notFind:'./src/js/notFind.js',                      //404页面
    statisticalKf:'./src/js/statisticalKf.js',          //对外-统计分析-客服页面
    statisticalGame:'./src/js/statisticalGame.js',      //对外-统计分析-游戏数据页面
    statisticalService:'./src/js/statisticalService.js',//对外-统计分析-智能服务页面
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            url: 'file-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // 将CSS提取为单独文件
    new ExtractTextPlugin('css/[name].css'),
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
      minChunks: 5
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
