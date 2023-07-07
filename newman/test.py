import json;
import boto3

rest_api_id = '4qppov5b81'
ip_address = '192.169.96.201'
# 创建 API Gateway 客户端
client = boto3.client('apigateway', region_name='ap-south-1')
# 指定要连接的 API 的 RestApiId
api_id = '4qppov5b81'

try:
    # 调用客户端的 get_rest_api 方法，指定对应的 RestApiId
    response = client.get_rest_api(restApiId=api_id)

    # 输出返回结果
    print(response)

except Exception as e:
    # 输出异常信息
    print('发生错误:', str(e))


#policy = response['policy']
#print(policy)
# sta = policy['Statement']
# print(sta)
# 使用示例


# 增加 IP 到白名单
# api_ids = rest_api_id.split(',')
# print(api_ids)
# for id in api_ids:
    
#     response = client.create_deployment(
#         restApiId = id,
#         stageName='tscgw-pre'
#     )

