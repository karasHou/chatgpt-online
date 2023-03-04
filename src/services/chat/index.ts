import { chatModel } from './../../../typings.d';
import { request } from '@umijs/max';
import { message } from 'antd';

interface IQuerData {
  prompt?: string;
  model?: chatModel;
  token?: string;
}

// 3.5新模型
const REQ_URL = 'https://api.openai.com/v1/chat/completions';
// 旧模型
// const REQ_URL = "https://api.openai.com/v1/completions";

/**
 * 请求结论
 * @param params
 * @param options
 * @returns
 */
export async function queryCompletions(
  data: IQuerData = { model: 'gpt-3.5-turbo' },
  options?: { [key: string]: any },
) {
  const { token, prompt } = data;

  // 一些默认的选项
  const defaultData = () => ({
    model: 'gpt-3.5-turbo',
    temperature: 1,
    top_p: 1,
    max_tokens: 2048,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['Human:', 'AI:'],
  });
  const newData = { prompt, ...defaultData() } as IQuerData;

  return request<any>(REQ_URL, {
    method: 'POST',
    data: newData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // dataField: ""
    ...(options || {}),
  }).catch((e) => {
    message.error(e?.response?.data?.error?.message);
  });
}

/* 

function aa(params: string = "1233") {
  console.log(params);
}


aa()
 */
