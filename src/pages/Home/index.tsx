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
    </div>
  );
};

export default HomePage;
