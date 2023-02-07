# TODO

 - [ ] 支持配置不同的模型（默认

# query demo
```
POST /v1/completions HTTP/1.1
Accept: application/json, text/plain, */*
Content-Type: application/json
User-Agent: OpenAI/NodeJS/3.1.0
Content-Length: 186
Host: api.openai.com
Connection: close


{
    "model":"text-davinci-003-playground",
    "prompt":"js 如何同时解析 换行符和markdown语法",
    "temperature":1,
    "max_tokens":2548,
    "top_p":1,
    "frequency_penalty":0,
    "presence_penalty":0
}
```
