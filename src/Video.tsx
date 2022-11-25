import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, message, Alert, Select } from 'antd';

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

  const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;


  const renderEmpty = () => {
    if(!playBtn){
      return <>
        <div className='emptyBox' style={{backgroundColor: randomHex()}}>
          部分视频解析时间较长，请耐心等待。
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
      <Input onChange={changeInput} allowClear placeholder='请放入需要解析的视频地址' />
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
              {`${Item} ---  【稳定】`}
            </Option>
          })
        }
      </Select>
    </div>
    <div className='videoPlay'>
      {renderEmpty()}
    </div>
    <div style={{textAlign:'center', marginTop:20}}>不定期更新解析资源，仅供学习使用，切勿用于商业。</div>
  </div>
}


export default Video;