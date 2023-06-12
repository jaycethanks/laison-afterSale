export default {
  data() {
    return {
      pageInfo: {
        condition: {
          orderByClause: 'create_time desc',
        },
        loading: false,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
      },
      dataSource: null,
    };
  },
  watch: {
    'pageInfo.pagination': {
      handler: function () {
        this.loadData();
      },
    },
  },

  methods: {
    resetSearch() {
      this.pageInfo.condition = {
        orderByClause: 'create_time desc',
      };
      this.loadData();
    },
    async loadData(options = {}) {
      this.pageInfo.loading = true;
      const res = await this.findPage(Object.assign(this.pageInfo, options));
      if (res.status === 200) {
        const { total, list } = res.data;
        this.dataSource = list;
        this.pageInfo.pagination.total = total;
      }
      this.pageInfo.loading = false;
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pageInfo.pagination };
      pager.current = pagination.current;
      this.pageInfo.pagination = pager;
      this.loadData();
    },
  },
};
