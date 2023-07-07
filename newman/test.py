import json;
import boto3
access_key = 'AKIARA2JM4WX3VI6HL4T'
secret_key = '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'

session = boto3.Session(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key
)
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

