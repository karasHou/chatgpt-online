import { chatModel } from './../../../typings.d';
import { request } from '@umijs/max';


/**
 * 请求结论
 * @param params 
 * @param options 
 * @returns 
 */
export async function queryCompletions(
  data: {
    prompt?: string,
    model?: chatModel,
    token?: string
  } = { model: "text-davinci-003-playground" },
  options?: { [key: string]: any },
) {
  const { token } = data;

  const defaultData = () => { "text-davinci-003-playground" }

  data = Object.assign({}, defaultData)


  return request<any>('https://api.openai.com/v1/completions', {
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    },
    // dataField: ""
    ...(options || {}),
  });
}



/* 

function aa(params: string = "1233") {
  console.log(params);
}


aa()
 */
