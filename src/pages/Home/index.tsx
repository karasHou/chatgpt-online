import { useModel } from '@umijs/max';
import { Button, Divider, Drawer, message, Input } from 'antd';
import styles from './index.less';
import React, { useEffect, useState } from 'react';
import { queryCompletions } from '@/services/chat';

const HomePage: React.FC = () => {
  const [inputVal, setInputVal] = useState('');

  // 使用 useEffect 来实现请求
  useEffect(() => {
    const fetchData = async () => {
      const data = await queryCompletions({
        prompt: '测试',
        token: inputVal,
      });

      console.log(data);
    };

    fetchData().catch(console.error);
  }, [inputVal]);

  const handleInputChange = (e: Event) => {
    setInputVal(e.target.value);
  };

  return (
    <>
      <Input onChange={handleInputChange} value={inputVal}></Input>
      <p>{inputVal}</p>
    </>
  );
};

export default HomePage;
