import { Button, Form, Input, Card, message } from 'antd';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useLocation } from 'umi';
import { queryCompletions } from '@/services/chat';
import { useLocalStorageState } from 'ahooks';

const { TextArea } = Input;

const LOCAL_TOKEN_NAME = 'karas_chat_token';

const HomePage: React.FC = () => {
  const [storageToken, setToken] = useLocalStorageState<string | undefined>(
    LOCAL_TOKEN_NAME,
    undefined,
  );
  const [value, setMkdStr] = useState<string>('');
  const [loadingFLag, setFlag] = useState(false);

  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);

  const postCompletions = async (values: any) => {
    const { prompt, token } = values;
    // 本地化 || 地址栏 || input输入
    const tokenValue = token || urlParams.get('token') || storageToken;
    console.log('storageToken: ', storageToken);

    if (!tokenValue) {
      message.error('请输入API keys');
      return;
    }
    // 设置本地化存储
    setToken(tokenValue);

    setFlag(true);
    const data = await queryCompletions({ prompt, token: tokenValue });

    setFlag(false);

    setMkdStr(data?.choices?.[0]?.text || '暂无结果');
  };

  const onFinish = (values: any) => {
    console.log('values: ', values);
    postCompletions(values);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          prompt: 'JS实现一个深度优先遍历',
          token: storageToken,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="API keys"
          name="token"
          tooltip="获取API keys请访问: https://platform.openai.com/account/api-keys"
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item
          label="请输入询问的问题"
          name="prompt"
          rules={[{ required: true, message: '请输入问题' }]}
        >
          <TextArea rows={6}></TextArea>
        </Form.Item>

        {/* 提交 */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loadingFLag} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {value && (
        <Card>
          <MDEditor.Markdown source={value} />
        </Card>
      )}
      {/* <a href="https://github.com/karasHou" className="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#70B7FD; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style> */}
    </div>
  );
};

export default HomePage;
