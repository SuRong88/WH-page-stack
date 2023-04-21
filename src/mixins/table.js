export default {
	data() {
		return {
			tableData: [],
			sumData: {},
			toolBoxHeight: 0,
			tableHeight: 0,
			showTable: false,
			showTool: true,
			showSummary: true,
			currentRow: null,
			checkAll: true,
			isIndeterminate: false,
			filterAttrTags: [],
			checkedAttrTags: [],
			attrTags2: []
		}
	},
	watch: {
		checkedAttrTags: function(val) {
			this.checkAll = val.length == this.attrTags.length;
			this.isIndeterminate = val.length > 0 && val.length < this.attrTags.length;
			for (let key in this.attrGroup) {
				const length1 = val.filter(v => this.attrGroup[key].includes(v)).length;
				const length2 = this.attrGroup[key].length;
				if (length1 == length2) {
					this.tabList[key].status = 2;
				} else if (length1 > 0 && length1 < length2) {
					this.tabList[key].status = 1;
				} else {
					this.tabList[key].status = 0;
				}
			}
		}
	},
	mounted() {
		this.toolBoxHeight = this.$refs.toolBox.offsetHeight;
		const offsetTop = this.$refs.offsetLine.offsetTop;
		const tableHeight = window.innerHeight - offsetTop - 185;
		this.$Bus.$on('fullscreen', boolVal => {
			console.log(`全屏:${boolVal}`);
			if (boolVal) {
				this.tableHeight = window.innerHeight - offsetTop - 50;
			} else {
				this.tableHeight = tableHeight;
			}
		});
		this.resizeTable();
		window.addEventListener('resize', this.calTableHeight);
	},
	updated() {
		this.$nextTick(() => {
			this.$refs['dataTable'].doLayout();
		});
	},
	activated() {
		const offsetTop = this.$refs.offsetLine.offsetTop;
		const tableHeight = window.innerHeight - offsetTop - 185;
		this.$Bus.$on('fullscreen', boolVal => {
			console.log(`全屏:${boolVal}`);
			if (boolVal) {
				this.tableHeight = window.innerHeight - offsetTop - 50;
			} else {
				this.tableHeight = tableHeight;
			}
		});
		this.resizeTable();
		window.addEventListener('resize', this.calTableHeight);
	},
	deactivated() {
		this.$Bus.$off('fullscreen');
		window.removeEventListener('resize', this.calTableHeight);
	},
	beforeDestroy() {
		this.$Bus.$off('fullscreen');
		window.removeEventListener('resize', this.calTableHeight);
	},
	methods: {
		// 触发搜索按钮
		handleSearch() {
			this.query.currentPage = 1;
			this.query.totalPage = 0;
			this.query.totalCount = 0;
			this.getTableList();
		},
		// 排序改变
		handleSortChange({
			column,
			prop,
			order
		}) {
			console.log(prop, order);
			this.query.sortValue = order ? order.replace('ending', '') : '';
			this.query.sortKey = order ? prop : '';
			this.getTableList();
		},
		// 选中行改变
		handleCurrentChange(val) {
			this.currentRow = val;
		},
		handlePageChange(page) {
			const query = JSON.parse(JSON.stringify(this.$route.query));
			query.page = page;
			this.$router.push({
				query: query
			});
			this.query.currentPage = page;
			this.getTableList();
		},
		handleSizeChange(size) {
			this.query.currentPage = 1;
			this.query.pageSize = size;
			this.getTableList();
		},
		checkDate() {
			const query = this.query;
			if (!query.startDate || !query.endDate) {
				this.$message.warning('请选择起止日期');
				return false;
			}
			query.startDate = this.formatDate(query.startDate, 'YYYY-MM-DD');
			query.endDate = this.formatDate(query.endDate, 'YYYY-MM-DD');
			if (Date.parse(query.startDate) > Date.parse(query.endDate)) {
				this.$message.warning('开始日期不能大于结束日期');
				return false;
			}
			return true;
		},
		resizeTable() {
			const offsetTop = this.$refs.offsetLine.offsetTop;
			const tableHeight = window.innerHeight - offsetTop - 185;
			this.tableHeight = tableHeight;
			// wait
			this.showTool && (this.toolBoxHeight = this.$refs.toolBox.offsetHeight);
			this.showTable = true;
		},
		toolBoxToggle() {
			this.showTool = !this.showTool;
			this.tableHeight += this.toolBoxHeight * (this.showTool ? -1 : 1);
		},
		calTableHeight() {
			this.debounce(this.resizeTable, 100);
		},
		// attr 分组item
		attrGroupHandle(tabKey) {
			console.log(tabKey);
			if (this.tabList[tabKey].status == 2) {
				this.tabList[tabKey].status = 0;
				this.checkedAttrTags = this.checkedAttrTags.filter(item => !this.attrGroup[tabKey].includes(item));
			} else {
				this.tabList[tabKey].status = 2;
				this.checkedAttrTags = Array.from(new Set([...this.attrGroup[tabKey], ...this.checkedAttrTags]));
			}
		},
		toggleTabAll() {
			if (this.checkedAttrTags.length < this.attrTags.length) {
				this.checkedAttrTags = this.attrTags.map(el => el.value);
				for (let key in this.tabList) {
					this.tabList[key].status = 2;
				}
			} else {
				this.checkedAttrTags = [];
				for (let key in this.tabList) {
					this.tabList[key].status = 0;
				}
			}
		},
		checkAllChange(val) {
			this.checkedAttrTags = val ? this.attrTags.map(item => item.value) : [];
			this.isIndeterminate = false;
		},
		checkedAttrTagsChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.attrTags.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.attrTags.length;
		}
	}
}
