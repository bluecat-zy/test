import json;
import boto3

rest_api_id = '4qppov5b81'
ip_address = '192.169.96.201'
# 创建 API Gateway 客户端
client = boto3.client('apigateway' , region_name= 'ap-south-1')

response = client.get_rest_api(
    restApiId = rest_api_id
)

policy = response['policy']
print(policy)
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

