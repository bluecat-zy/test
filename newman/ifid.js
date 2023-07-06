const ifidMap = new Map([
 ['IC001S' ,{url: '/MasterOperationAPI/translation',lamdbda: ''],
 ['IC002S' ,{url: '/MasterOperationAPI/translationgroup',lamdbda: ''],
 ['IC003S' ,{url: '/MasterOperationAPI/translationeconnect',lamdbda: ''],
 ['IC101S' ,{url: '/FactoryDataAPI/RegisterFactoryData',lamdbda: ''],
 ['IT101C' ,{url: '/FactoryDataAPI/RegisterFactoryDataNotification',lamdbda: ''],
 ['IC102S' ,{url: '/FactoryDataAPI/(.+)',lamdbda: ''],
 ['IT102C' ,{url: '/FactoryDataAPI/ReplaceFactoryDataNotification',lamdbda: ''],
 ['IC103S' ,{url: '/DCMProvisioningAPI/requests/(.+)',lamdbda: ''],
 ['IT103C' ,{url: '/DCMProvisioningAPI/DCMProvisioningNotification',lamdbda: ''],
 ['IT201E' ,{url: '/IgnitionNotification/IgnitionNotification',lamdbda: ''],
 ['IT207R' ,{url: '/UploadVPNotification/VehicleProbeNotification',lamdbda: ''],
 ['IT208E' ,{url: '/eConnectTripNotification/eConnectTripDataNotification',lamdbda: ''],
 ['IC209O' ,{url: '/eConnectRealTimeStatusRequestsAPI/requests/(.+)',lamdbda: ''],
 ['IT209C' ,{url: '/eConnectRealTimeStatusRequestsAPI/eConnectReal-TimeStatusResultNotification',lamdbda: ''],
 ['IT301E' ,{url: '/UBIAPI/UBIThresholdExceedingNotification',lamdbda: ''],
 ['IT302E' ,{url: '/WarningNotification/WarningNotification',lamdbda: ''],
 ['IT303E' ,{url: '/AllDiagnosticsAPI/DTCNotification',lamdbda: ''],
 ['IT304E' ,{url: '/AllDiagnosticsAPI/FFDNotification',lamdbda: ''],
 ['IT305E' ,{url: '/AllDiagnosticsAPI/LastNotification',lamdbda: ''],
 ['IT306E' ,{url: '/AlarmReportAPI/AlarmNotification',lamdbda: ''],
 ['IT307E' ,{url: '/SVTAPI/TOWNotification',lamdbda: ''],
 ['IT308E' ,{url: '/eConnectRealTimeStatusRequestsAPI/eConnectRemoteConfirmNotification',lamdbda: ''],
 ['IT309E' ,{url: '/eConnectEventNotification/eConnectEventNotification',lamdbda: ''],
 ['IT310E' ,{url: '/eConnectStatusChangeNotification/eConnectStatusChangeNotification',lamdbda: ''],
 ['IC311O' ,{url: '/LocalServerCommunicationAPI/requests/(.+)',lamdbda: ''],
 ['IC312O' ,{url: '/LocalServerCommunicationAPI/displayrequests/(.+)',lamdbda: ''],
 ['IT311C' ,{url: '/LocalServerCommunicationAPI/LocalServerCommunicationNotification',lamdbda: ''],
 ['IC202S' ,{url: '/VPConditionFileAPI/emergencyflag',lamdbda: ''],
 ['IC203S' ,{url: '/VPConditionFileAPI/emergency/(.+)/(.+)',lamdbda: ''],
 ['IC204S' ,{url: '/VPConditionFileAPI/unique/(.+)/(.+)',lamdbda: ''],
 ['IC210S' ,{url: '/VPConditionFileAPI/unique/(.+)/(.+)',lamdbda: ''],
 ['IC205S' ,{url: '/VPConditionFileAPI/dpccartype/(.+)/(.+)',lamdbda: ''],
 ['IC206S' ,{url: '/VPConditionFileAPI/default/(.+)/(.+)',lamdbda: ''],
 ['IC401O' ,{url: '/eConnectRemoteControlAPI/requests/(.+)',lamdbda: ''],
 ['IT401C' ,{url: '/eConnectRemoteControlAPI/eConnectRemoteControlResultNotification',lamdbda: ''],
 ['IC501O' ,{url: '/RemoteControlAPI/requests/(.+)',lamdbda: ''],
 ['IT501C' ,{url: '/RemoteControlAPI/RemoteControlResultNotification',lamdbda: ''],
 ['IC502O' ,{url: '/RemoteImmobilizerAPI/requests/(.+)',lamdbda: ''],
 ['IT502C' ,{url: '/RemoteImmobilizerAPI/RemoteImmobilizerNotification',lamdbda: ''],
 ['IC601O' ,{url: '/AllDiagnosticsAPI/(.+)',lamdbda: ''],
 ['IC602O' ,{url: '/RemoteMonitoringAPI/schedule/(.+)',lamdbda: ''],
 ['IT602C' ,{url: '/RemoteMonitoringAPI/RemoteMonitoringNotification',lamdbda: ''],
 ['IC603O' ,{url: '/SVTAPI/requests/periodic/(.+)',lamdbda: ''],
 ['IT603R' ,{url: '/SVTAPI/SVTNotification',lamdbda: ''],
 ['IC604O' ,{url: '/SVTAPI/requests/periodic/(.+)',lamdbda: '']
]);
module.exports = ifidMap;
