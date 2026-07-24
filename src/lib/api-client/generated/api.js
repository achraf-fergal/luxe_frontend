import {
  useMutation,
  useQuery
} from "@tanstack/react-query";
import { customFetch } from "../custom-fetch";
const withQueryKey = (query, queryKey) => {
  const result = { queryKey };
  for (const key of Object.keys(query)) {
    if (key === "queryKey") continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: () => query[key]
    });
  }
  return result;
};
const getHealthCheckUrl = () => {
  return `/api/healthz`;
};
const healthCheck = async (options) => {
  return customFetch(
    getHealthCheckUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getHealthCheckQueryKey = () => {
  return [
    `/api/healthz`
  ];
};
const getHealthCheckQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getHealthCheckQueryKey();
  const queryFn = ({ signal }) => healthCheck({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useHealthCheck(options) {
  const queryOptions = getHealthCheckQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getListProductsUrl = (params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/api/products?${stringifiedParams}` : `/api/products`;
};
const listProducts = async (params, options) => {
  return customFetch(
    getListProductsUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListProductsQueryKey = (params) => {
  return [
    `/api/products`,
    ...params ? [params] : []
  ];
};
const getListProductsQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListProductsQueryKey(params);
  const queryFn = ({ signal }) => listProducts(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListProducts(params, options) {
  const queryOptions = getListProductsQueryOptions(params, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getCreateProductUrl = () => {
  return `/api/products`;
};
const createProduct = async (productInput, options) => {
  return customFetch(
    getCreateProductUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(productInput)
    }
  );
};
const getCreateProductMutationOptions = (options) => {
  const mutationKey = ["createProduct"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return createProduct(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateProduct = (options) => {
  return useMutation(getCreateProductMutationOptions(options));
};
const getListFeaturedProductsUrl = () => {
  return `/api/products/featured`;
};
const listFeaturedProducts = async (options) => {
  return customFetch(
    getListFeaturedProductsUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListFeaturedProductsQueryKey = () => {
  return [
    `/api/products/featured`
  ];
};
const getListFeaturedProductsQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListFeaturedProductsQueryKey();
  const queryFn = ({ signal }) => listFeaturedProducts({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListFeaturedProducts(options) {
  const queryOptions = getListFeaturedProductsQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getListBestSellersUrl = () => {
  return `/api/products/best-sellers`;
};
const listBestSellers = async (options) => {
  return customFetch(
    getListBestSellersUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListBestSellersQueryKey = () => {
  return [
    `/api/products/best-sellers`
  ];
};
const getListBestSellersQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListBestSellersQueryKey();
  const queryFn = ({ signal }) => listBestSellers({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListBestSellers(options) {
  const queryOptions = getListBestSellersQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getListNewArrivalsUrl = () => {
  return `/api/products/new-arrivals`;
};
const listNewArrivals = async (options) => {
  return customFetch(
    getListNewArrivalsUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListNewArrivalsQueryKey = () => {
  return [
    `/api/products/new-arrivals`
  ];
};
const getListNewArrivalsQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListNewArrivalsQueryKey();
  const queryFn = ({ signal }) => listNewArrivals({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListNewArrivals(options) {
  const queryOptions = getListNewArrivalsQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getGetProductUrl = (id) => {
  return `/api/products/${id}`;
};
const getProduct = async (id, options) => {
  return customFetch(
    getGetProductUrl(id),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetProductQueryKey = (id) => {
  return [
    `/api/products/${id}`
  ];
};
const getGetProductQueryOptions = (id, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetProductQueryKey(id);
  const queryFn = ({ signal }) => getProduct(id, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: id !== null && id !== void 0, ...queryOptions };
};
function useGetProduct(id, options) {
  const queryOptions = getGetProductQueryOptions(id, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getUpdateProductUrl = (id) => {
  return `/api/products/${id}`;
};
const updateProduct = async (id, productUpdate, options) => {
  return customFetch(
    getUpdateProductUrl(id),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(productUpdate)
    }
  );
};
const getUpdateProductMutationOptions = (options) => {
  const mutationKey = ["updateProduct"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { id, data } = props ?? {};
    return updateProduct(id, data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateProduct = (options) => {
  return useMutation(getUpdateProductMutationOptions(options));
};
const getDeleteProductUrl = (id) => {
  return `/api/products/${id}`;
};
const deleteProduct = async (id, options) => {
  return customFetch(
    getDeleteProductUrl(id),
    {
      ...options,
      method: "DELETE"
    }
  );
};
const getDeleteProductMutationOptions = (options) => {
  const mutationKey = ["deleteProduct"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { id } = props ?? {};
    return deleteProduct(id, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteProduct = (options) => {
  return useMutation(getDeleteProductMutationOptions(options));
};
const getListRelatedProductsUrl = (id) => {
  return `/api/products/${id}/related`;
};
const listRelatedProducts = async (id, options) => {
  return customFetch(
    getListRelatedProductsUrl(id),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListRelatedProductsQueryKey = (id) => {
  return [
    `/api/products/${id}/related`
  ];
};
const getListRelatedProductsQueryOptions = (id, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListRelatedProductsQueryKey(id);
  const queryFn = ({ signal }) => listRelatedProducts(id, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: id !== null && id !== void 0, ...queryOptions };
};
function useListRelatedProducts(id, options) {
  const queryOptions = getListRelatedProductsQueryOptions(id, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getListCategoriesUrl = () => {
  return `/api/categories`;
};
const listCategories = async (options) => {
  return customFetch(
    getListCategoriesUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListCategoriesQueryKey = () => {
  return [
    `/api/categories`
  ];
};
const getListCategoriesQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListCategoriesQueryKey();
  const queryFn = ({ signal }) => listCategories({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListCategories(options) {
  const queryOptions = getListCategoriesQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getCreateCategoryUrl = () => {
  return `/api/categories`;
};
const createCategory = async (categoryInput, options) => {
  return customFetch(
    getCreateCategoryUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(categoryInput)
    }
  );
};
const getCreateCategoryMutationOptions = (options) => {
  const mutationKey = ["createCategory"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return createCategory(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateCategory = (options) => {
  return useMutation(getCreateCategoryMutationOptions(options));
};
const getGetCategoryUrl = (id) => {
  return `/api/categories/${id}`;
};
const getCategory = async (id, options) => {
  return customFetch(
    getGetCategoryUrl(id),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetCategoryQueryKey = (id) => {
  return [
    `/api/categories/${id}`
  ];
};
const getGetCategoryQueryOptions = (id, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetCategoryQueryKey(id);
  const queryFn = ({ signal }) => getCategory(id, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: id !== null && id !== void 0, ...queryOptions };
};
function useGetCategory(id, options) {
  const queryOptions = getGetCategoryQueryOptions(id, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getGetCartUrl = () => {
  return `/api/cart`;
};
const getCart = async (options) => {
  return customFetch(
    getGetCartUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetCartQueryKey = () => {
  return [
    `/api/cart`
  ];
};
const getGetCartQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetCartQueryKey();
  const queryFn = ({ signal }) => getCart({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useGetCart(options) {
  const queryOptions = getGetCartQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getAddToCartUrl = () => {
  return `/api/cart/items`;
};
const addToCart = async (cartItemInput, options) => {
  return customFetch(
    getAddToCartUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(cartItemInput)
    }
  );
};
const getAddToCartMutationOptions = (options) => {
  const mutationKey = ["addToCart"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return addToCart(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useAddToCart = (options) => {
  return useMutation(getAddToCartMutationOptions(options));
};
const getUpdateCartItemUrl = (itemId) => {
  return `/api/cart/items/${itemId}`;
};
const updateCartItem = async (itemId, cartItemUpdate, options) => {
  return customFetch(
    getUpdateCartItemUrl(itemId),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(cartItemUpdate)
    }
  );
};
const getUpdateCartItemMutationOptions = (options) => {
  const mutationKey = ["updateCartItem"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { itemId, data } = props ?? {};
    return updateCartItem(itemId, data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateCartItem = (options) => {
  return useMutation(getUpdateCartItemMutationOptions(options));
};
const getRemoveCartItemUrl = (itemId) => {
  return `/api/cart/items/${itemId}`;
};
const removeCartItem = async (itemId, options) => {
  return customFetch(
    getRemoveCartItemUrl(itemId),
    {
      ...options,
      method: "DELETE"
    }
  );
};
const getRemoveCartItemMutationOptions = (options) => {
  const mutationKey = ["removeCartItem"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { itemId } = props ?? {};
    return removeCartItem(itemId, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useRemoveCartItem = (options) => {
  return useMutation(getRemoveCartItemMutationOptions(options));
};
const getApplyCouponUrl = () => {
  return `/api/cart/coupon`;
};
const applyCoupon = async (couponApply, options) => {
  return customFetch(
    getApplyCouponUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(couponApply)
    }
  );
};
const getApplyCouponMutationOptions = (options) => {
  const mutationKey = ["applyCoupon"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return applyCoupon(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useApplyCoupon = (options) => {
  return useMutation(getApplyCouponMutationOptions(options));
};
const getListOrdersUrl = (params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/api/orders?${stringifiedParams}` : `/api/orders`;
};
const listOrders = async (params, options) => {
  return customFetch(
    getListOrdersUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListOrdersQueryKey = (params) => {
  return [
    `/api/orders`,
    ...params ? [params] : []
  ];
};
const getListOrdersQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListOrdersQueryKey(params);
  const queryFn = ({ signal }) => listOrders(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListOrders(params, options) {
  const queryOptions = getListOrdersQueryOptions(params, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getCreateOrderUrl = () => {
  return `/api/orders`;
};
const createOrder = async (orderInput, options) => {
  return customFetch(
    getCreateOrderUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(orderInput)
    }
  );
};
const getCreateOrderMutationOptions = (options) => {
  const mutationKey = ["createOrder"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return createOrder(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateOrder = (options) => {
  return useMutation(getCreateOrderMutationOptions(options));
};
const getGetOrderUrl = (id) => {
  return `/api/orders/${id}`;
};
const getOrder = async (id, options) => {
  return customFetch(
    getGetOrderUrl(id),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetOrderQueryKey = (id) => {
  return [
    `/api/orders/${id}`
  ];
};
const getGetOrderQueryOptions = (id, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetOrderQueryKey(id);
  const queryFn = ({ signal }) => getOrder(id, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: id !== null && id !== void 0, ...queryOptions };
};
function useGetOrder(id, options) {
  const queryOptions = getGetOrderQueryOptions(id, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getUpdateOrderStatusUrl = (id) => {
  return `/api/orders/${id}/status`;
};
const updateOrderStatus = async (id, orderStatusUpdate, options) => {
  return customFetch(
    getUpdateOrderStatusUrl(id),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(orderStatusUpdate)
    }
  );
};
const getUpdateOrderStatusMutationOptions = (options) => {
  const mutationKey = ["updateOrderStatus"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { id, data } = props ?? {};
    return updateOrderStatus(id, data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateOrderStatus = (options) => {
  return useMutation(getUpdateOrderStatusMutationOptions(options));
};
const getListUsersUrl = (params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/api/users?${stringifiedParams}` : `/api/users`;
};
const listUsers = async (params, options) => {
  return customFetch(
    getListUsersUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListUsersQueryKey = (params) => {
  return [
    `/api/users`,
    ...params ? [params] : []
  ];
};
const getListUsersQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListUsersQueryKey(params);
  const queryFn = ({ signal }) => listUsers(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListUsers(params, options) {
  const queryOptions = getListUsersQueryOptions(params, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getGetMeUrl = () => {
  return `/api/users/me`;
};
const getMe = async (options) => {
  return customFetch(
    getGetMeUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetMeQueryKey = () => {
  return [
    `/api/users/me`
  ];
};
const getGetMeQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetMeQueryKey();
  const queryFn = ({ signal }) => getMe({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useGetMe(options) {
  const queryOptions = getGetMeQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getUpdateMeUrl = () => {
  return `/api/users/me`;
};
const updateMe = async (userUpdate, options) => {
  return customFetch(
    getUpdateMeUrl(),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(userUpdate)
    }
  );
};
const getUpdateMeMutationOptions = (options) => {
  const mutationKey = ["updateMe"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return updateMe(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateMe = (options) => {
  return useMutation(getUpdateMeMutationOptions(options));
};
const getLoginUserUrl = () => {
  return `/api/users/login`;
};
const loginUser = async (loginInput, options) => {
  return customFetch(
    getLoginUserUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(loginInput)
    }
  );
};
const getLoginUserMutationOptions = (options) => {
  const mutationKey = ["loginUser"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return loginUser(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useLoginUser = (options) => {
  return useMutation(getLoginUserMutationOptions(options));
};
const getRegisterUserUrl = () => {
  return `/api/users/register`;
};
const registerUser = async (registerInput, options) => {
  return customFetch(
    getRegisterUserUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(registerInput)
    }
  );
};
const getRegisterUserMutationOptions = (options) => {
  const mutationKey = ["registerUser"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return registerUser(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useRegisterUser = (options) => {
  return useMutation(getRegisterUserMutationOptions(options));
};
const getLogoutUserUrl = () => {
  return `/api/users/logout`;
};
const logoutUser = async (options) => {
  return customFetch(
    getLogoutUserUrl(),
    {
      ...options,
      method: "POST"
    }
  );
};
const getLogoutUserMutationOptions = (options) => {
  const mutationKey = ["logoutUser"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = () => {
    return logoutUser(requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useLogoutUser = (options) => {
  return useMutation(getLogoutUserMutationOptions(options));
};
const getListReviewsUrl = (params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/api/reviews?${stringifiedParams}` : `/api/reviews`;
};
const listReviews = async (params, options) => {
  return customFetch(
    getListReviewsUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListReviewsQueryKey = (params) => {
  return [
    `/api/reviews`,
    ...params ? [params] : []
  ];
};
const getListReviewsQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListReviewsQueryKey(params);
  const queryFn = ({ signal }) => listReviews(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListReviews(params, options) {
  const queryOptions = getListReviewsQueryOptions(params, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getCreateReviewUrl = () => {
  return `/api/reviews`;
};
const createReview = async (reviewInput, options) => {
  return customFetch(
    getCreateReviewUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(reviewInput)
    }
  );
};
const getCreateReviewMutationOptions = (options) => {
  const mutationKey = ["createReview"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return createReview(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateReview = (options) => {
  return useMutation(getCreateReviewMutationOptions(options));
};
const getGetWishlistUrl = () => {
  return `/api/wishlist`;
};
const getWishlist = async (options) => {
  return customFetch(
    getGetWishlistUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetWishlistQueryKey = () => {
  return [
    `/api/wishlist`
  ];
};
const getGetWishlistQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetWishlistQueryKey();
  const queryFn = ({ signal }) => getWishlist({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useGetWishlist(options) {
  const queryOptions = getGetWishlistQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getAddToWishlistUrl = (productId) => {
  return `/api/wishlist/${productId}`;
};
const addToWishlist = async (productId, options) => {
  return customFetch(
    getAddToWishlistUrl(productId),
    {
      ...options,
      method: "POST"
    }
  );
};
const getAddToWishlistMutationOptions = (options) => {
  const mutationKey = ["addToWishlist"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { productId } = props ?? {};
    return addToWishlist(productId, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useAddToWishlist = (options) => {
  return useMutation(getAddToWishlistMutationOptions(options));
};
const getRemoveFromWishlistUrl = (productId) => {
  return `/api/wishlist/${productId}`;
};
const removeFromWishlist = async (productId, options) => {
  return customFetch(
    getRemoveFromWishlistUrl(productId),
    {
      ...options,
      method: "DELETE"
    }
  );
};
const getRemoveFromWishlistMutationOptions = (options) => {
  const mutationKey = ["removeFromWishlist"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { productId } = props ?? {};
    return removeFromWishlist(productId, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useRemoveFromWishlist = (options) => {
  return useMutation(getRemoveFromWishlistMutationOptions(options));
};
const getListCouponsUrl = () => {
  return `/api/coupons`;
};
const listCoupons = async (options) => {
  return customFetch(
    getListCouponsUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getListCouponsQueryKey = () => {
  return [
    `/api/coupons`
  ];
};
const getListCouponsQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListCouponsQueryKey();
  const queryFn = ({ signal }) => listCoupons({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useListCoupons(options) {
  const queryOptions = getListCouponsQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getCreateCouponUrl = () => {
  return `/api/coupons`;
};
const createCoupon = async (couponInput, options) => {
  return customFetch(
    getCreateCouponUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(couponInput)
    }
  );
};
const getCreateCouponMutationOptions = (options) => {
  const mutationKey = ["createCoupon"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props) => {
    const { data } = props ?? {};
    return createCoupon(data, requestOptions);
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateCoupon = (options) => {
  return useMutation(getCreateCouponMutationOptions(options));
};
const getGetAnalyticsSummaryUrl = () => {
  return `/api/analytics/summary`;
};
const getAnalyticsSummary = async (options) => {
  return customFetch(
    getGetAnalyticsSummaryUrl(),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetAnalyticsSummaryQueryKey = () => {
  return [
    `/api/analytics/summary`
  ];
};
const getGetAnalyticsSummaryQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetAnalyticsSummaryQueryKey();
  const queryFn = ({ signal }) => getAnalyticsSummary({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useGetAnalyticsSummary(options) {
  const queryOptions = getGetAnalyticsSummaryQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
const getGetSalesDataUrl = (params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/api/analytics/sales?${stringifiedParams}` : `/api/analytics/sales`;
};
const getSalesData = async (params, options) => {
  return customFetch(
    getGetSalesDataUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
};
const getGetSalesDataQueryKey = (params) => {
  return [
    `/api/analytics/sales`,
    ...params ? [params] : []
  ];
};
const getGetSalesDataQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetSalesDataQueryKey(params);
  const queryFn = ({ signal }) => getSalesData(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions };
};
function useGetSalesData(params, options) {
  const queryOptions = getGetSalesDataQueryOptions(params, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
export {
  addToCart,
  addToWishlist,
  applyCoupon,
  createCategory,
  createCoupon,
  createOrder,
  createProduct,
  createReview,
  deleteProduct,
  getAddToCartMutationOptions,
  getAddToCartUrl,
  getAddToWishlistMutationOptions,
  getAddToWishlistUrl,
  getAnalyticsSummary,
  getApplyCouponMutationOptions,
  getApplyCouponUrl,
  getCart,
  getCategory,
  getCreateCategoryMutationOptions,
  getCreateCategoryUrl,
  getCreateCouponMutationOptions,
  getCreateCouponUrl,
  getCreateOrderMutationOptions,
  getCreateOrderUrl,
  getCreateProductMutationOptions,
  getCreateProductUrl,
  getCreateReviewMutationOptions,
  getCreateReviewUrl,
  getDeleteProductMutationOptions,
  getDeleteProductUrl,
  getGetAnalyticsSummaryQueryKey,
  getGetAnalyticsSummaryQueryOptions,
  getGetAnalyticsSummaryUrl,
  getGetCartQueryKey,
  getGetCartQueryOptions,
  getGetCartUrl,
  getGetCategoryQueryKey,
  getGetCategoryQueryOptions,
  getGetCategoryUrl,
  getGetMeQueryKey,
  getGetMeQueryOptions,
  getGetMeUrl,
  getGetOrderQueryKey,
  getGetOrderQueryOptions,
  getGetOrderUrl,
  getGetProductQueryKey,
  getGetProductQueryOptions,
  getGetProductUrl,
  getGetSalesDataQueryKey,
  getGetSalesDataQueryOptions,
  getGetSalesDataUrl,
  getGetWishlistQueryKey,
  getGetWishlistQueryOptions,
  getGetWishlistUrl,
  getHealthCheckQueryKey,
  getHealthCheckQueryOptions,
  getHealthCheckUrl,
  getListBestSellersQueryKey,
  getListBestSellersQueryOptions,
  getListBestSellersUrl,
  getListCategoriesQueryKey,
  getListCategoriesQueryOptions,
  getListCategoriesUrl,
  getListCouponsQueryKey,
  getListCouponsQueryOptions,
  getListCouponsUrl,
  getListFeaturedProductsQueryKey,
  getListFeaturedProductsQueryOptions,
  getListFeaturedProductsUrl,
  getListNewArrivalsQueryKey,
  getListNewArrivalsQueryOptions,
  getListNewArrivalsUrl,
  getListOrdersQueryKey,
  getListOrdersQueryOptions,
  getListOrdersUrl,
  getListProductsQueryKey,
  getListProductsQueryOptions,
  getListProductsUrl,
  getListRelatedProductsQueryKey,
  getListRelatedProductsQueryOptions,
  getListRelatedProductsUrl,
  getListReviewsQueryKey,
  getListReviewsQueryOptions,
  getListReviewsUrl,
  getListUsersQueryKey,
  getListUsersQueryOptions,
  getListUsersUrl,
  getLoginUserMutationOptions,
  getLoginUserUrl,
  getLogoutUserMutationOptions,
  getLogoutUserUrl,
  getMe,
  getOrder,
  getProduct,
  getRegisterUserMutationOptions,
  getRegisterUserUrl,
  getRemoveCartItemMutationOptions,
  getRemoveCartItemUrl,
  getRemoveFromWishlistMutationOptions,
  getRemoveFromWishlistUrl,
  getSalesData,
  getUpdateCartItemMutationOptions,
  getUpdateCartItemUrl,
  getUpdateMeMutationOptions,
  getUpdateMeUrl,
  getUpdateOrderStatusMutationOptions,
  getUpdateOrderStatusUrl,
  getUpdateProductMutationOptions,
  getUpdateProductUrl,
  getWishlist,
  healthCheck,
  listBestSellers,
  listCategories,
  listCoupons,
  listFeaturedProducts,
  listNewArrivals,
  listOrders,
  listProducts,
  listRelatedProducts,
  listReviews,
  listUsers,
  loginUser,
  logoutUser,
  registerUser,
  removeCartItem,
  removeFromWishlist,
  updateCartItem,
  updateMe,
  updateOrderStatus,
  updateProduct,
  useAddToCart,
  useAddToWishlist,
  useApplyCoupon,
  useCreateCategory,
  useCreateCoupon,
  useCreateOrder,
  useCreateProduct,
  useCreateReview,
  useDeleteProduct,
  useGetAnalyticsSummary,
  useGetCart,
  useGetCategory,
  useGetMe,
  useGetOrder,
  useGetProduct,
  useGetSalesData,
  useGetWishlist,
  useHealthCheck,
  useListBestSellers,
  useListCategories,
  useListCoupons,
  useListFeaturedProducts,
  useListNewArrivals,
  useListOrders,
  useListProducts,
  useListRelatedProducts,
  useListReviews,
  useListUsers,
  useLoginUser,
  useLogoutUser,
  useRegisterUser,
  useRemoveCartItem,
  useRemoveFromWishlist,
  useUpdateCartItem,
  useUpdateMe,
  useUpdateOrderStatus,
  useUpdateProduct
};
