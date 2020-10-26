import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input, Pagination, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import Api from "../lib/api";
import { mergeQueryString, Queries, usePagination } from "../lib/utils";
import ProductList from "../components/ProductList";
import Row from "../components/Row";
import GoToCart from "../components/GoToCart";
const { Option } = Select;
const ProductsPage = () => {
  const router = useRouter();
  const { page, search, sort, itemsPerPage, order } = usePagination();
  const [searchInput, setSearchInput] = useState(search);
  const response = Api.getProducts({
    currentPage: page,
    search,
    sort,
    itemsPerPage,
    order,
  });
  const move = (queries: Queries) => {
    router.push(mergeQueryString(router, queries));
  };
  if (!response.success) {
    console.error(`💩 error from server : `, response.message);
    return (
      <Layout title="상품 보기">
        오류가 발생했어요. 잠시 후 다시 시도해주세요!
      </Layout>
    );
  }
  const { currentPage, productItems, total } = response.data;
  return (
    <Layout title="상품 보기">
      <Row style={{ marginBottom: 6 }}>
        <Select
          style={{ marginRight: 6 }}
          value={sort}
          onChange={(sort) => move({ page: 1, sort })}
        >
          <Option value="score">점수별</Option>
          <Option value="price">가격별</Option>
        </Select>
        <Select value={order} onChange={(order) => move({ page: 1, order })}>
          <Option value="desc">내림차순</Option>
          <Option value="asc">오름차순</Option>
        </Select>
        <form
          style={{ display: "flex", marginLeft: "auto" }}
          onSubmit={(e) => {
            e.preventDefault();
            move({ page: 1, search: searchInput });
          }}
        >
          <Input
            placeholder="검색"
            style={{ width: 150, marginRight: 2 }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined translate="no" />}
          />
        </form>
      </Row>
      <ProductList productItems={productItems} />
      <Row>
        <Pagination
          style={{ margin: "0 8px 0 auto" }}
          defaultCurrent={currentPage}
          total={total}
          pageSize={itemsPerPage}
          onChange={(nextPage) => move({ page: nextPage })}
        />
        <Select
          value={itemsPerPage}
          onChange={(itemsPerPage) => move({ page: 1, itemsPerPage })}
        >
          <Option value={3}>3개 / 페이지</Option>
          <Option value={6}>6개 / 페이지</Option>
          <Option value={12}>12개 / 페이지</Option>
        </Select>
      </Row>
      <GoToCart />
    </Layout>
  );
};

export default ProductsPage;
