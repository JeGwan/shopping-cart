import coupons from "../data/coupons";
import productItems from "../data/productItems";
import { ProductItem } from "./types";

interface ApiSuccessResponse<Data> {
  success: true;
  data: Data;
}
interface ApiFailedResponse {
  success: false;
  message: string;
}

type ApiResponse<Data> = ApiSuccessResponse<Data> | ApiFailedResponse;

interface getProductsProps {
  currentPage?: number;
  itemsPerPage?: number;
  sort?: string;
  order?: string;
  search?: string;
}

export default class Api {
  private static data = {
    coupons,
    productItems,
  };

  static getProducts = ({
    currentPage = 1,
    itemsPerPage = 6,
    sort = "score",
    order = "desc",
    search,
  }: getProductsProps): ApiResponse<{
    currentPage: number;
    total: number;
    productItems: ProductItem[];
  }> => {
    try {
      if (currentPage < 1) throw { message: "page는 1이상이어야 합니다." };
      if (itemsPerPage > 100)
        throw { message: "한번에 최대 100개까지 요청할 수 있습니다." };

      let resultProductItems: ProductItem[] = [];
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      // 검색
      if (search) {
        resultProductItems = productItems.filter(
          (productItem) => productItem.title.indexOf(search) !== -1
        );
      } else {
        resultProductItems = productItems.slice();
      }

      // 정렬
      if (sort && (sort === "score" || sort === "price")) {
        if (order === "desc") {
          resultProductItems.sort((a, b) => b[sort] - a[sort]);
        } else {
          resultProductItems.sort((a, b) => a[sort] - b[sort]);
        }
      }

      return {
        success: true,
        data: {
          currentPage,
          total: resultProductItems.length,
          productItems: resultProductItems.slice(start, end),
        },
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}
