import React, { useState } from 'react';
import { Button, Input, message } from 'antd';

import API from './api/api';

import './Video.less';

const Video =  () => {

  const [ playUrl, setPlayUrl ] = useState('')
  const [ playBtn, setPlayBtn ] = useState(false)

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayUrl(event.target.value.trim())
  }

  const play = () => {
    if(!playUrl.length){
      message.error('请输入要播放的链接地址')
      return
    }
    setPlayUrl(API['m3u8'] + playUrl)
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
    return <iframe src={playUrl} allowFullScreen={true} />
  }

  return <div className='videoBox'>
    <div className='videoHeader'>
      <Input onChange={changeInput} />
      <Button type="primary" onClick={play}>播放</Button>
    </div>
    <div className='videoPlay'>
      {renderEmpty()}
    </div>
  </div>
}


export default Video;