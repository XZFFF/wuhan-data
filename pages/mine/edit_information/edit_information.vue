<template>
	<view>
		<!-- 头像 -->
		<view class="change-head" style=" display: flex; justify-content: center;">
			<image class="head" src="../../../static/icon/mine/head.png"></image>
		</view>
		<!-- 信息列表 -->
		<view>
			<view>
				<view class="title">用户名</view>
				<image class="editInfo-img" src="../../../static/icon/edit_information/head.png"></image>
				<view class="list">
					<view class="list-cell">
						<input class="input"  placeholder="李晓华" />
					</view>
				</view>
			</view>
			<view style="color: #C0BFC0;">
				<view class="title">性别</view>
				<radio-group class="flex" name="gender" style="margin-bottom: 30upx;">
					<image class="editInfo-img" src="../../../static/icon/edit_information/sex.png"></image>
					<label style="">
					<radio value="男" />男</label>
					<label>
					<radio value="女" />女</label>
				</radio-group>
			</view>
			<view>
				<view class="title">手机认证</view>
				<image class="editInfo-img" src="../../../static/icon/edit_information/yes.png"></image>
				<view class="list">
					<view class="list-cell">
						<view class="modify-tel">
							修改手机
						</view>
						<input class="input" style="" disabled="disabled" placeholder="181 **** 0000" />
							
					</view>
				</view>
			</view>
			<view>
				<view class="title">职务</view>
				<image class="editInfo-img" src="../../../static/icon/edit_information/identity.png"></image>
				<view class="list">
					<view class="list-cell">
						<input class="input" style="" disabled="disabled" placeholder="XX处 处长" />
					</view>
				</view>
			</view>
			<view>
				<view class="title">出生日期</view>
				<image class="editInfo-img" src="../../../static/icon/edit_information/date.png"></image>
				<view class="list">
					<view class="list-cell">
						<input class="input"  placeholder="1980-01-01" />
					</view>
				</view>
			</view>
			<view>
				<view class="title">个人描述</view>
				<image class="editInfo-img" src="../../../static/icon/edit_information/talk.png"></image>
				<view class="list">
					<view class="list-cell">
						<input class="input"  placeholder="时代赋予我们使命" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.head{
		width: 150upx;
		height: 150upx;
		margin-top: 30upx;
		border-radius:100%; 
		overflow:hidden;
	}
	.title{
		color: #C0BFC0;
		margin-top: 30upx;
		margin-bottom: 10upx;
		margin-left: 130upx;
		font-size: 30upx;
	}
	.editInfo-img{
		width: 50upx;
		height: 50upx;
		float: left;
		margin-left: 50upx;
		margin-right: 30upx;
		align-content: center;
	}
	.list{
		width: 85%;
	}
	.input{
		background-clolor: #F8F8F8;
		border-style:none none solid none;
		border-width: 1upx;
		border-color: #C0BFC0;
		font-size: 35upx;
	}
	.modify-tel{
		position: absolute;
		right: 120upx;
		width: 120upx;
		height: 40upx;
		border-radius: 20px; 
		background-color:#1A82D2;
		font-size: 25upx;
		color: #FFFFFF;
		text-align: center;
	}
</style>
