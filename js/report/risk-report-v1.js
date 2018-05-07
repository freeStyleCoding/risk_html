/**
 *
 * @author Storys.Zhang
 *
 * Created at 2017/12/16 by Storys.Zhang in credan_risk_html
 * 
 * Copyright (c) 2017, Credan(上海)-版权所有
 */
layui.use(['table', 'layer', 'common'], function() {
	var table = layui.table,
		$ = layui.jquery,
		layer = layui.layer,
		common = layui.common;
	var id = requestUrl("riskId");
	var risknumber = requestUrl("risknumber");
		console.log(risknumber)
	if(!id && !risknumber) {
		common.alertError("不要这么随意...");
		return false;
	}
	var riskRootPath = layui.data('risk-server').rootPath;
	var reportPath = riskRootPath + "/v3/risk/report/v1"
	if(risknumber){
		reportPath = riskRootPath + "/v3/risk/report/v2";
	}
	common.loading();
	$.ajax({
		url: reportPath,
		data: {
			"reportId": id,
			"riskNumber": risknumber,
		}, //请求的附加参数，用json对象
		method: 'POST',
		//dataType :"json",
		success: function(res) {
			if(typeof res === 'string') {
				res = JSON.parse(res);
			}
			if(res.success) {
				try {
					loadData(res.data);
				} catch(e) {
					console.error(e);
					common.closeLoading();
					common.loadError();
				}
			} else {
				common.alertError('加载失败：' + res.message);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			common.closeLoading();
			common.alertError('请稍后重试：' + textStatus);
		}
	});

	function loadData(data) {
		//报告信息
		var reportVersionData = data.reportVersionModel;
		$(".report-number").text(reportVersionData.reportNumber);
		$(".report-time").text(reportVersionData.reportTime);
		$(".result-message").text(reportVersionData.resultMessage);
		//用户信息
		var userData = data.userModel;
		$(".username").text(userData.username);
		$(".phone").text(userData.phone);
		$(".id-number").text(userData.idNumber);
		$(".age").text(userData.age);
		$(".sex").text(userData.sex);
		$(".id-number-location").text(userData.idNumberLocation);
		$(".phone-location").text(userData.phoneLocation);
		$(".phone-carrier").text(userData.phoneCarrier);
		$(".phone3items-result").text(userData.phone3itemsResult);
		$(".work-name").text(userData.workName);
		$(".work-level").text(userData.workLevel);
		
		//地址可信度
		var assessAddrReliabilitiesData = data.assessAddrReliabilities;
		table.render({
			elem: "#t-assess-address",
			height: assessAddrReliabilitiesData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '地址可信度',
					colspan: 15
				}],
				[{
						field: 'item',
						title: '评分项'
					}, {
						field: 'score',
						title: '评分',
						templet: function(assessAddrReliabilitiesData) {
							
						if(!assessAddrReliabilitiesData.score) {
							return '';
						}
							switch(assessAddrReliabilitiesData.score) {
								case 'M0_M0':
									return '输入地址与手机号匹配未知且与身份证号匹配未知';
								case 'Ma_M0':
									return '输入地址与手机号匹配且与身份证号匹配未知';
								case 'Mb_M0':
									return '输入地址与手机号不匹配且与身份证号匹配未知';
								case 'M0_Ma':
									return '输入地址与手机号匹配未知且与身份证号匹配';
								case 'Ma_Ma':
									return '输入地址与手机号匹配且与身份证号匹配';
								case 'Mb_Ma':
									return '输入地址与手机号不匹配且与身份证号匹配';
								case 'M0_Mb':
									return '输入地址与手机号匹配未知且与身份证号不匹配';
								case 'Ma_Mb':
									return '输入地址与手机号匹配且与身份证号不匹配';
								case 'Mb_Mb':
									return '输入地址与手机号不匹配且与身份证号不匹配';
								default:
									return assessAddrReliabilitiesData.score;
							}
						}
					},
					{
						field: 'healthReferScore',
						title: '健康参考值', 
					    minWidth: 400
					}
				]
			],
			data: assessAddrReliabilitiesData,
			size: 'sm',
			limit: assessAddrReliabilitiesData.length
		});
		
		//地址信息
		var addressData = data.addressModelList;
		table.render({
			elem: "#t-address",
			cols: [
				[{
					align: 'left',
					title: '地址信息',
					colspan: 15
				}],
				[{
					field: 'type',
					title: '地址类型'
				}, {
					field: 'provinceName',
					title: '省'
				}, {
					field: 'cityName',
					title: '市'
				}, {
					field: 'countyName',
					title: '县'
				}, {
					field: 'detail',
					title: '详细地址',
					minWidth: 150
				}]
			],
			data: addressData,
			size: 'sm'
		});
		//联系人信息
		var contactsData = data.contactsModelList;
		table.render({
			elem: "#t-contacts",
			cols: [
				[{
					align: 'left',
					title: '联系人信息',
					colspan: 15
				}],
				[{
					field: 'name',
					title: '联系人姓名',
					minWidth: 100
				}, {
					field: 'telPhone',
					title: '联系人电话',
					minWidth: 100
				}, {
					field: 'relation',
					title: '关系'
				}, {
					field: 'callRank',
					title: '运营商通话记录排名'
				}]
			],
			data: contactsData,
			size: 'sm',
		});
		//风控规则信息
		var riskRuleHitData = data.riskRuleHitModelList;
		table.render({
			elem: "#t-risk-rule",
			height: 300,
			cols: [
				[{
					align: 'left',
					title: '风控规则',
					colspan: 15
				}],
				[{
					field: 'ruleDesc',
					title: '规则描述',
					minWidth: 280
				}, {
					field: 'tirggerTime',
					title: '触发时间'
				}]
			],
			data: riskRuleHitData,
			size: 'sm',
			limit: riskRuleHitData.length
		});
		//行为分逾期率
		var riskScore = data.riskScoreModel;
		var riskScoreData = riskScore.riskSyntheticalScoreModelList;
		$(".synthetical-score").text(riskScore.syntheticalScore);
		table.render({
			elem: "#t-overdue-rate",
			//height: 300,
			cols: [[{
				align: 'left',
				title: '对应分值参考',
				colspan: 15
			}],
				[{
					field: 'scoreStart',
					title: '分值区间'
				}, {
					field: 'scoreEnd',
					title: '分值区间'
				}, {
					field: 'overdueRate',
					title: '逾期率'
				}]
			],
			data: riskScoreData,
			size: 'sm',
			limit: 30
		});
		//黑名单详细信息
		var blackList = data.blackListModel;
		$(".apply-user-hit").text(blackList.applyUserHit);
		var applyUserBlackListData = blackList.applyUserBlackListModelList;
		table.render({
			elem: "#t-apply-user-hit",
			//height: 150,
			cols: [
				[{
					align: 'left',
					title: '黑名单详细信息',
					colspan: 15
				}],
				[{
					field: 'number',
					title: '手机号码'
				}, {
					field: 'type',
					title: '黑名单类型'
				}, {
					field: 'source',
					title: '黑名单来源'
				}, {
					field: 'remarks',
					title: '备注'
				}]
			],
			data: applyUserBlackListData,
			size: 'sm'
		});
		$(".contacts-hit-count").text(blackList.contactsHitCount);
		var contactsBlackListData = blackList.contactsBlackListModelList;
		table.render({
			elem: "#t-contacts-hit-count",
			//height: 150,
			cols: [
				[{
					align: 'left',
					title: '联系人命中黑名单详细信息',
					colspan: 15
				}],
				[{
					field: 'number',
					title: '手机号码'
				}, {
					field: 'type',
					title: '黑名单类型'
				}, {
					field: 'source',
					title: '黑名单来源'
				}, {
					field: 'remarks',
					title: '备注'
				}]
			],
			data: contactsBlackListData,
			size: 'sm'
		});
		//多头借贷信息
		var multipleLoan = data.multipleLoanModel;
		$(".count-by-query").text(multipleLoan.countByQuery);
		$(".loan-record-count").text(multipleLoan.loanRecordCount);
		$(".overdue-recordC-count").text(multipleLoan.overdueRecordCount);
		var multipleLoanListData = multipleLoan.overdueDetailModelList;
		table.render({
			elem: "#t-overdue",
			//height: 150,
			cols: [
				[{
					align: 'left',
					title: '详细逾期信息',
					colspan: 15
				}],
				[{
					field: 'phone',
					title: '手机号码'
				}, {
					field: 'loanDate',
					title: '借款日前'
				}, {
					field: 'loanAmount',
					title: '借款金额'
				}, {
					field: 'overdueMessage',
					title: '逾期信息'
				}]
			],
			data: multipleLoanListData,
			size: 'sm',
			limit: multipleLoanListData.length
		});
		//线下小贷 
		var debtSeverityModelData = data.debtSeverityModel; 
		table.render({ 
			elem: "#t-debt-severity",
			height: debtSeverityModelData.length > 7 ? 300 : '', 
			cols: [ 
				[{ 
					align: 'left', 
					title: '线下小贷', 
					colspan: 15 
				}], 
				[{ 
					field: 'item', 
					title: '评估项' 
				}, { 
					title: '取值' 
				}] 
			], 
			data: debtSeverityModelData, 
			size: 'sm', 
			limit: debtSeverityModelData.length 
		}); 
		//多头借贷 
		var crawlMultiloanModelData = data.crawlMultiloanModel; 
		table.render({ 
			elem: "#t-crawl-multiloan", 
			height: crawlMultiloanModelData.length > 7 ? 300 : '', 
			cols: [ 
				[{ 
					align: 'left', 
					title: '多头借贷', 
					colspan: 15 
				}], 
				[{ 
					field: 'item', 
					title: '评分项' 
				}, { 
					field: 'score', 
					title: '评分' 
				}, { 
					field: 'healthReferScore', 
					title: '健康参考值' 
				}] 
			], 
			data: crawlMultiloanModelData, 
			size: 'sm', 
			limit: crawlMultiloanModelData.length 
		}); 
		//设备信息
		var deviceModelListData = data.deviceModelList;
		table.render({
			elem: "#t-device",
			height: deviceModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '设备信息',
					colspan: 15
				}],
				[{
					field: 'item',
					title: '评分项'
				}, {
					field: 'score',
					title: '评分'
				}, {
					field: 'healthReferScore',
					title: '健康参考值'
				}]
			],
			data: deviceModelListData,
			size: 'sm',
			limit: deviceModelListData.length
		});
		//消费能力
		var consumptionPowerModelListData = data.consumptionPowerModelList;
		table.render({
			elem: "#t-consumption-power",
			height: consumptionPowerModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '消费能力',
					colspan: 15
				}],
				[{
					field: 'item',
					title: '评估项'
				}, {
					field: 'value',
					title: '取值'
				}, {
					field: 'healthReferScore',
					title: '健康参考值'
				}]
			],
			data: consumptionPowerModelListData,
			size: 'sm',
			limit: consumptionPowerModelListData.length
		});
		//刑事案底 
		var securitylModelData = data.securitylModel; 
		table.render({
			elem: "#t-security", 
			height: securitylModelData.length > 7 ? 300 : '', 
			cols: [ 
				[{ 
					align: 'left', 
					title: '刑事案底', 
					colspan: 15 
				}], 
				[{ 
					field: 'item', 
					title: '评估项' 
				}, { 
					field: 'score', 
					title: '取值'
				}] 
			], 
			data: securitylModelData, 
			size: 'sm', 
			limit: securitylModelData.length 
		}); 
		var zhengxinBlackListModelListData = data.zhengxinBlackListModelList; 
		table.render({ 
			elem: "#t-zhengxin-black", 
			height: zhengxinBlackListModelListData.length > 7 ? 500 : '', 
			cols: [ 
				[{ 
					align: 'left', 
					title: '法律涉诉', 
					colspan: 15 
				}], 
				[{ 
					field: 'dataType', 
					title: '数据类型', 
					minWidth: 100, 
					templet: function(zhengxinBlackListModelListData) { 
			if (!zhengxinBlackListModelListData.dataType){ 
			    return ''; 
			    } 
			   switch (zhengxinBlackListModelListData.dataType) { 
	       	       case 'cpws': 
			            return '裁判文书'; 
		            case 'zxgg': 
           			    return '执行公告'; 
		            case 'sxgg': 
		                return '失信公告'; 
		            case 'ktgg': 
			            return '开庭公告'; 
		            case 'fygg': 
			            return '法院公告'; 
		            case 'ajlc': 
			            return '案件流程信息'; 
		            case 'bgt': 
			            return '曝光台'; 
		            default: 
			            break; 
		                } 
		        return zhengxinBlackListModelListData.dataType 
	                } 
				}, { 
					field: 'sortTimeString', 
					title: '立案时间', 
					minWidth: 130
				}, { 
					field: 'body', 
					title: '内容', 
					minWidth: 200 
				}, { 
					field: 'pname', 
					title: '被执行人姓名', 
					minWidth: 120 
				}, { 
					field: 'court', 
					title: '执行法院名称', 
					minWidth: 150 
				}, { 
					field: 'caseState', 
					title: '案件状态', 
					minWidth: 100, 
			        templet: function(zhengxinBlackListModelListData) { 
			        if (!zhengxinBlackListModelListData.caseState){ 
			    return ''; 
			    } 
			   switch (zhengxinBlackListModelListData.caseState) { 
	       	       case '0': 
			            return '执行中'; 
		            case '1': 
           			    return '已结案'; 
		            default: 
			            break; 
		                } 
		        return zhengxinBlackListModelListData.caseState 
	                } 
				}, { 
					field: 'execMoney', 
					title: '执行标的', 
					minWidth: 120 
				}, { 
					field: 'lxqk', 
					title: '履行情况', 
					minWidth: 120 
 
				}, { 
					field: 'yjCode', 
					title: '依据文号', 
					minWidth: 200 
				}, { 
					field: 'jtqx', 
					title: '失信被执行人行为具体情形', 
					minWidth: 280 
				}, { 
					field: 'yiwu', 
					title: '生效法律文书确定的义务', 
					minWidth: 200 
				}, { 
					field: 'caseType', 
					title: '案件类别' 
				}, { 
					field: 'caseNo', 
					title: '案号', 
					minWidth: 200 
				}, { 
					field: 'province', 
					title: '省份', 
					minWidth: 100 
				}] 
			], 
			data: zhengxinBlackListModelListData, 
			size: 'sm',
			limit: zhengxinBlackListModelListData.length 
		}); 
		//运营商报告
		var mobileOperator = data.mobileOperatorModel;
		/**运营商通话信息*/
		var mobileCallData = mobileOperator.mobileCallModel;
		$(".total-day-count").text(mobileCallData.totalDayCount);
		$(".has-call-day-count").text(mobileCallData.hasCallDayCount);
		$(".none-call-day-count").text(mobileCallData.noneCallDayCount);
		$(".last-call-current-time-days").text(mobileCallData.lastCallCurrentTimeDays);
		$(".total-call-count").text(mobileCallData.totalCallCount);
		$(".night-call-count").text(mobileCallData.nightCallCount);
		/**联系人通话信息*/
		var mobileContactsModelListData = mobileOperator.mobileContactsModelList;
		table.render({
			elem: "#t-mobile-contacts",
			height: mobileContactsModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '联系人通话信息',
					colspan: 15
				}],
				[{
					field: 'contactName',
					title: '联系人姓名',
					minWidth: 100
				}, {
					field: 'lastContactTime',
					title: '最后联系时间'
				}, {
					field: 'number',
					title: '联系电话',
					minWidth: 100
				}, {
					field: 'tradeAddress',
					title: '通话地点',
					minWidth: 100
				}, {
					field: 'callRecords',
					title: '最近半年通话记录',
					minWidth: 180
				}, {
					field: 'callCount',
					title: '其他',
					minWidth: 150
				}]
			],
			data: mobileContactsModelListData,
			size: 'sm'
		});
		/**运营商多头借贷数据*/
		var mobileMultipleLoanModelListData = mobileOperator.mobileMultipleLoanModelList;
		table.render({
			elem: "#t-mobile-mobile-multiple-loan",
			height: mobileMultipleLoanModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '多头借贷数据',
					colspan: 15
				}],
				[{
					field: 'callInNumber',
					title: '呼入电话',
					minWidth: 150
				}, {
					field: 'callInCount',
					title: '呼入次数'
				}, {
					field: 'callInTime',
					title: '呼入时间'
				}, {
					field: 'callInSecond',
					title: '呼入时长'
				}, {
					field: 'numberLabel',
					title: '号码标记',
					minWidth: 80
				}, {
					field: 'callType',
					title: '呼入类型'
				}]
			],
			data: mobileMultipleLoanModelListData,
			size: 'sm',
			limit: mobileMultipleLoanModelListData.length
		});
		/**待机时长*/
		var mobileIdleModelListData = mobileOperator.mobileIdleModelList;
		table.render({
			elem: "#t-mobile-idle",
			height: mobileIdleModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '待机信息',
					colspan: 15
				}],
				[{
					field: 'lastCallTime',
					title: '上次通话时间'
				}, {
					field: 'thisCallTime',
					title: '本次通话时间'
				}, {
					field: 'idleDays',
					title: '待机天数'
				}]
			],
			data: mobileIdleModelListData,
			size: 'sm',
			limit: mobileIdleModelListData.length
		});
		/**夜间通话明细*/
		var mobileNightCallModelListData = mobileOperator.mobileNightCallModelList;
		table.render({
			elem: "#t-mobile-night-call",
			height: mobileNightCallModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '夜间通话明细',
					colspan: 15
				}],
				[{
					field: 'callTime',
					title: '通话时间',
					minWidth: 150
				}, {
					field: 'callType',
					title: '通话类型'
				}, {
					field: 'tradeAddress',
					title: '通话地点'
				}, {
					field: 'callSecond',
					title: '通话时长(秒)'
				}, {
					field: 'callNumber',
					title: '联系电话',
					minWidth: 100
				}]
			],
			data: mobileNightCallModelListData,
			size: 'sm',
			limit: mobileNightCallModelListData.length
		});
		/**互通号码*/
		var mobileTalkModelListData = mobileOperator.mobileTalkModelList;
		table.render({
			elem: "#t-mobile-talk",
			height: mobileTalkModelListData.length > 7 ? 300 : '',
			cols: [
				[{
					align: 'left',
					title: '互通号码统计',
					colspan: 15
				}],
				[{
					field: 'talkMonth',
					title: '通话月份',
					minWidth: 100
				}, {
					field: 'totalNumberCount',
					title: '通话号码数量'
				}, {
					field: 'callOutNumberCount',
					title: '呼出号码数量'
				}, {
					field: 'callInNumberCount',
					title: '呼入号码数量(秒)'
				}, {
					field: 'talkNumberCount',
					title: '互通号码数量'
				}]
			],
			data: mobileTalkModelListData,
			size: 'sm',
			limit: mobileTalkModelListData.length
		});
		layer.closeAll("dialog");
		layer.msg('数据加载成功', {
			time: 2 * 1000,
			shade: 0.8,
			icon: 1
		});

	}
});