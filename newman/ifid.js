const ifidMap = new Map([
 ['/MasterOperationAPI/translation' ,{ifid: 'IC001S',lamdbda: ""}],
 ['/MasterOperationAPI/translationgroup' ,{ifid: 'IC002S',lamdbda: ""}],
 ['/MasterOperationAPI/translationeconnect' ,{ifid: 'IC003S',lamdbda: ""}],
 ['/FactoryDataAPI/RegisterFactoryData' ,{ifid: 'IC101S',lamdbda: ""}],
 ['/FactoryDataAPI/RegisterFactoryDataNotification' ,{ifid: 'IT101C',lamdbda: ""}],
 ['/FactoryDataAPI/' ,{ifid: 'IC102S',lamdbda: ""}],
 ['/FactoryDataAPI/ReplaceFactoryDataNotification' ,{ifid: 'IT102C',lamdbda: ""}],
 ['/DCMProvisioningAPI/requests/' ,{ifid: 'IC103S',lamdbda: ""}],
 ['/DCMProvisioningAPI/DCMProvisioningNotification' ,{ifid: 'IT103C',lamdbda: ""}],
 ['/IgnitionNotification/IgnitionNotification' ,{ifid: 'IT201E',lamdbda: ""}],
 ['/UploadVPNotification/VehicleProbeNotification' ,{ifid: 'IT207R',lamdbda: ""}],
 ['/eConnectTripNotification/eConnectTripDataNotification' ,{ifid: 'IT208E',lamdbda: ""}],
 ['/eConnectRealTimeStatusRequestsAPI/requests/' ,{ifid: 'IC209O',lamdbda: ""}],
 ['/eConnectRealTimeStatusRequestsAPI/eConnectReal-TimeStatusResultNotification' ,{ifid: 'IT209C',lamdbda: ""}],
 ['/UBIAPI/UBIThresholdExceedingNotification' ,{ifid: 'IT301E',lamdbda: ""}],
 ['/WarningNotification/WarningNotification' ,{ifid: 'IT302E',lamdbda: ""}],
 ['/AllDiagnosticsAPI/DTCNotification' ,{ifid: 'IT303E',lamdbda: ""}],
 ['/AllDiagnosticsAPI/FFDNotification' ,{ifid: 'IT304E',lamdbda: ""}],
 ['/AllDiagnosticsAPI/LastNotification' ,{ifid: 'IT305E',lamdbda: ""}],
 ['/AlarmReportAPI/AlarmNotification' ,{ifid: 'IT306E',lamdbda: ""}],
 ['/SVTAPI/TOWNotification' ,{ifid: 'IT307E',lamdbda: ""}],
 ['/eConnectRealTimeStatusRequestsAPI/eConnectRemoteConfirmNotification' ,{ifid: 'IT308E',lamdbda: ""}],
 ['/eConnectEventNotification/eConnectEventNotification' ,{ifid: 'IT309E',lamdbda: ""}],
 ['/eConnectStatusChangeNotification/eConnectStatusChangeNotification' ,{ifid: 'IT310E',lamdbda: ""}],
 ['/LocalServerCommunicationAPI/requests/' ,{ifid: 'IC311O',lamdbda: ""}],
 ['/LocalServerCommunicationAPI/displayrequests/' ,{ifid: 'IC312O',lamdbda: ""}],
 ['/LocalServerCommunicationAPI/LocalServerCommunicationNotification' ,{ifid: 'IT311C',lamdbda: ""}],
 ['/VPConditionFileAPI/emergencyflag' ,{ifid: 'IC202S',lamdbda: ""}],
 ['/VPConditionFileAPI/emergency/' ,{ifid: 'IC203S',lamdbda: ""}],
 ['/VPConditionFileAPI/unique/' ,{ifid: 'IC204S',lamdbda: ""}],
 ['/VPConditionFileAPI/unique/' ,{ifid: 'IC210S',lamdbda: ""}],
 ['/VPConditionFileAPI/dpccartype/' ,{ifid: 'IC205S',lamdbda: ""}],
 ['/VPConditionFileAPI/default/' ,{ifid: 'IC206S',lamdbda: ""}],
 ['/eConnectRemoteControlAPI/requests/' ,{ifid: 'IC401O',lamdbda: ""}],
 ['/eConnectRemoteControlAPI/eConnectRemoteControlResultNotification' ,{ifid: 'IT401C',lamdbda: ""}],
 ['/RemoteControlAPI/requests/' ,{ifid: 'IC501O',lamdbda: ""}],
 ['/RemoteControlAPI/RemoteControlResultNotification' ,{ifid: 'IT501C',lamdbda: ""}],
 ['/RemoteImmobilizerAPI/requests/' ,{ifid: 'IC502O',lamdbda: ""}],
 ['/RemoteImmobilizerAPI/RemoteImmobilizerNotification' ,{ifid: 'IT502C',lamdbda: ""}],
 ['/AllDiagnosticsAPI/' ,{ifid: 'IC601O',lamdbda: ""}],
 ['/RemoteMonitoringAPI/schedule/' ,{ifid: 'IC602O',lamdbda: ""}],
 ['/RemoteMonitoringAPI/RemoteMonitoringNotification' ,{ifid: 'IT602C',lamdbda: ""}],
 ['/SVTAPI/requests/periodic/' ,{ifid: 'IC603O',lamdbda: ""}],
 ['/SVTAPI/SVTNotification' ,{ifid: 'IT603R',lamdbda: ""}],
 ['/SVTAPI/requests/periodic/' ,{ifid: 'IC604O',lamdbda: ""}]
]);
module.exports = ifidMap;