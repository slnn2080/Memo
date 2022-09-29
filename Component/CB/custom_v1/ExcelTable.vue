<template>
  <div class="container">
    <vue-table
      class="tables"
      v-model="products"
      :headers="headers"
      :custom-options="customOptions"
      :style-wrap-vue-table="styleWrapVueTable"
      :disable-cells="disableCells"
      :disable-sort-thead="disableSortThead"
      :loading="loading"
      :select-position="selectPosition"
    >
      <div slot="header">{{ title }}</div>
      <div slot="loader">Loader</div>
    </vue-table>
  </div>
</template>

<script>
export default {
  name: "ExcelTable",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      customOptions: {
        tbodyIndex: false,
        sortHeader: false,
        newData: {
          type: "input",
          value: "",
          active: false,
          style: {
            color: "#000",
          },
        },
        fuseOptions: {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 30,
          maxPatternLength: 64,
          minMatchCharLength: 1,
          findAllMatches: false,
          tokenize: false,
          keys: ["value"],
        },
      },

      disableCells: ["a"],
      loading: false,
      // parentScrollElement: {
      //   attribute: "html",
      //   positionTop: 0,
      // },
      selectPosition: {
        top: 0,
        left: 0,
      },
      disableSortThead: ["a"],
      styleWrapVueTable: {},
      headers: [
        {
          headerName: "日付",
          headerKey: "date",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "支部",
          headerKey: "local",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "コード",
          headerKey: "code",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "摘要",
          headerKey: "abstract",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "相手科目",
          headerKey: "aite",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "借方科目",
          headerKey: "karikata",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "借方金額",
          headerKey: "karikataokane",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "貸方科目",
          headerKey: "kashikata",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "貸方金額",
          headerKey: "kashikataokane",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "入金事由",
          headerKey: "nyuukin",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "備考",
          headerKey: "bikou",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "台帳転記",
          headerKey: "daicyou",
          style: {
            width: "8.33%",
            minWidth: "8.33%",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "10.4px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
      ],
      products: [
        {
          date: {
            type: "input",
            value: "2021, 04, 01",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          local: {
            type: "input",
            value: "",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          code: {
            type: "input",
            value: "16",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          abstract: {
            type: "input",
            value: "手数料",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          aite: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          nyuukin: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          bikou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          daicyou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
        },
        {
          date: {
            type: "input",
            value: "2021, 04, 01",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          local: {
            type: "input",
            value: "",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          code: {
            type: "input",
            value: "16",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          abstract: {
            type: "input",
            value: "手数料",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          aite: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          nyuukin: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          bikou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          daicyou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
        },
      ],
    };
  },

  methods: {
    changeData(row, header) {
      console.log(row, header);
    },
    sortProduct(event, header, colIndex) {
      console.log("sort product");
    },
    // callback
    changeColorThead(event, header, colIndex) {
      this.headers[colIndex].style.color = "#e40000";
    },
    changeColorTbody(event, header, rowIndex, colIndex) {
      console.log(event, header, rowIndex, colIndex);
      this.products[rowIndex][header].style = {};
      this.products[rowIndex][header].style.color = "#e40000";
    },
    changeValueTbody(event, header, rowIndex, colIndex) {
      this.products[rowIndex][header].value = "T-shirt";
    },
    changeValueThead(event, entry, colIndex) {
      this.headers[colIndex].headerName = "T-shirt";
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px 0 1500px 0;
  margin-top: 24px;
}

::-moz-selection {
  color: #2c3e50;
  background: transparent;
}
::selection {
  color: #2c3e50;
  background: transparent;
}

/deep/ .vue-spreadsheet .td span {
  font-size: 12px;
}
/deep/ .vue-spreadsheet .vue_table {
  position: relative;
  width: 100%;
}

/deep/ .vue-spreadsheet .th {
  width: 8.33%;
  min-width: 8.33%;
  color: #8898aa;
  background-color: #f6f9fc;
  font-size: 10px;
  font-weight: 600;
  border-width: 1px 0px;
}

/deep/ .vue-spreadsheet .td {
  width: 8.33%;
}
</style>
