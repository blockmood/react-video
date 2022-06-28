import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, message, Alert, Select } from 'antd';

import wx from 'weixin-sdk-js';
import Marquee from 'react-fast-marquee';

import API from './api/api';

import './Video.less';

const { Option } = Select;

const Video =  () => {

  const [ inputValue, setInputValue] = useState<string>('');
  const [ playUrl, setPlayUrl ] = useState<string>('');
  const [ playBtn, setPlayBtn ] = useState<boolean>(false);
  const [ nodeValue, setNodeValue ] = useState<any>(API['m3u8']);

  useEffect(()=>{
    wx.ready(()=>{
      wx.updateTimelineShareData({ 
        title: '8566视频解析', 
        link: window.location.href,
        imgUrl: '', // 分享图标
        success: function () {
          // 设置成功
        }
      })
    })
  },[])

  const changeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(event.target.value.trim())
  },[])

  const onChangeSelect = (event:React.ChangeEvent) => {
    setNodeValue(event)
  }

  const play = () => {
    if(!inputValue.length){
      message.error('请输入要播放的链接地址')
      return
    }
    if(!/^(http:\/\/|https:\/\/).*/g.test(inputValue)){
      message.error('请输入要正确的的页面地址')
      return
    }
    setPlayUrl(nodeValue + inputValue)
    setPlayBtn(true)
  }

  const renderEmpty = () => {
    if(!playBtn){
      return <>
        <div className='emptyBox'>
          放入视频地址后开始解析
        </div>
      </>
    }
    return <iframe title='video' src={playUrl} allowFullScreen={true} />
  }

  return <div className='videoBox'>
    <div className="tooltip">
      <Alert 
        type="info" 
        banner
        message={
        <Marquee pauseOnHover gradient={false}>
          免费全网影视VIP视频vip会员免会员看电视剧电影！ 不能播放，可刷新更换接口！
        </Marquee>
      }/>
    </div>
    <div className='videoHeader'>
      <Input onChange={changeInput} allowClear />
      <Button type="primary" onClick={play}>播放</Button>
    </div>
    <div className="tooltip">
      <Select
        defaultValue={nodeValue}
        style={{width:'100%'}}
        placeholder="请选择要解析视频的节点"
        onChange={onChangeSelect}
        >
        {
          Object.keys(API).map((Item,index) => {
            return <Option key={Item} value={API[Item as keyof typeof API]}>
              {`通用节点${index+1} ---  【稳定】`}
            </Option>
          })
        }
      </Select>
    </div>
    <div className='videoPlay'>
      {renderEmpty()}
    </div>
  </div>
}


export default Video;