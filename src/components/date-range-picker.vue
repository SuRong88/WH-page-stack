<template>
	<el-date-picker
		v-model="dates"
		type="daterange"
		:picker-options="pickerOptions"
		:clearable="clearable"
		:disabled="disabled"
		:disabledDate="disabledDate"
		:format="format"
		:value-format="valueFormat"
		:range-separator="rangeSeparator"
		:start-placeholder="startPlaceholder"
		:end-placeholder="endPlaceholder"
	></el-date-picker>
</template>

<script>
const getDateRange = function(day = 7) {
	const end = new Date();
	const start = new Date();
	start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
	return [start, end];
};
const pickerOptions = {
	shortcuts: [
		// {
		// 	text: '最近3天',
		// 	onClick(picker) {
		// 		picker.$emit('pick', getDateRange(7));
		// 	}
		// },
		{
			text: '最近7天',
			onClick(picker) {
				picker.$emit('pick', getDateRange(7));
			}
		},
		{
			text: '最近30天',
			onClick(picker) {
				picker.$emit('pick', getDateRange(30));
			}
		},
		{
			text: '最近90天',
			onClick(picker) {
				picker.$emit('pick', getDateRange(90));
			}
		},
		{
			text: '不限时间',
			onClick(picker) {
				picker.$emit('pick', ['', '']);
			}
		}
	]
};
export default {
	props: {
		clearable: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		disabledDate: {
			type: Boolean,
			default: false
		},
		format: {
			type: String,
			default: 'yyyy-MM-dd'
		},
		'value-format': {
			type: String,
			default: 'yyyy-MM-dd'
		},
		'range-separator': {
			type: String,
			default: '至'
		},
		'start-placeholder': {
			type: String,
			default: '开始日期'
		},
		'end-placeholder': {
			type: String,
			default: '结束日期'
		},
		day: {
			type: Number,
			validator(val) {
				return [7, 30, 90].includes(val);
			},
			default: ''
		}
	},
	data() {
		return {
			pickerOptions,
			dates: ''
		};
	},
	watch: {
		dates: {
			handler: function(newVal, oldVal) {
				if (!newVal) {
					this.$emit('dateChange', ['', '']);
					return;
				}
				this.$emit('dateChange', [this.dates[0], this.dates[1]]);
			},
			deep: true
		}
	},
	created() {
		if (this.day) {
			this.setDate(this.day);
		} else {
			this.$emit('dateChange', ['', '']);
		}
		if (this.disabledDate) {
			this.pickerOptions.disabledDate = time => time.getTime() > Date.now();
		}
	},
	methods: {
		setDate(day) {
			const pattern = this.valueFormat.replace(/y/g, 'Y').replace(/d/g, 'D');
			this.dates = getDateRange(day).map(ele => this.formatDate(ele, pattern));
		}
	}
};
</script>

<style></style>
