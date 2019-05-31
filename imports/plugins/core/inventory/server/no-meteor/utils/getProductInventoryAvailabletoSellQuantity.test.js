import mockContext from "/imports/test-utils/helpers/mockContext";
import { rewire as rewire$getVariants, restore as restore$getVariants } from "/imports/plugins/core/catalog/server/no-meteor/utils/getVariants";
import getProductInventoryAvailableToSellQuantity from "./getProductInventoryAvailableToSellQuantity";

const mockCollections = { ...mockContext.collections };
const mockGetVariants = jest.fn().mockName("getVariants");

const internalShopId = "123";
const internalCatalogProductId = "999";
const internalVariantIds = ["875", "874", "879"];

const createdAt = new Date("2018-04-16T15:34:28.043Z");
const updatedAt = new Date("2018-04-17T15:34:28.043Z");

const mockVariants = [
  {
    _id: internalVariantIds[0],
    ancestors: [internalCatalogProductId],
    barcode: "barcode",
    createdAt,
    height: 0,
    index: 0,
    inventoryAvailableToSell: 6,
    inventoryManagement: true,
    inventoryPolicy: false,
    inventoryInStock: 5,
    isDeleted: false,
    isLowQuantity: true,
    isSoldOut: false,
    isVisible: true,
    length: 0,
    lowInventoryWarningThreshold: 0,
    metafields: [
      {
        value: "value",
        namespace: "namespace",
        description: "description",
        valueType: "valueType",
        scope: "scope",
        key: "key"
      }
    ],
    minOrderQuantity: 0,
    optionTitle: "Untitled Option",
    originCountry: "US",
    shopId: internalShopId,
    sku: "sku",
    taxCode: "0000",
    taxDescription: "taxDescription",
    title: "Small Concrete Pizza",
    updatedAt,
    variantId: internalVariantIds[0],
    weight: 0,
    width: 0
  },
  {
    _id: internalVariantIds[1],
    ancestors: [internalCatalogProductId, internalVariantIds[0]],
    barcode: "barcode",
    height: 2,
    index: 0,
    inventoryAvailableToSell: 3,
    inventoryManagement: true,
    inventoryPolicy: true,
    inventoryInStock: 5,
    isDeleted: false,
    isLowQuantity: true,
    isSoldOut: false,
    isVisible: true,
    length: 2,
    lowInventoryWarningThreshold: 0,
    metafields: [
      {
        value: "value",
        namespace: "namespace",
        description: "description",
        valueType: "valueType",
        scope: "scope",
        key: "key"
      }
    ],
    minOrderQuantity: 0,
    optionTitle: "Awesome Soft Bike",
    originCountry: "US",
    shopId: internalShopId,
    sku: "sku",
    taxCode: "0000",
    taxDescription: "taxDescription",
    title: "One pound bag",
    variantId: internalVariantIds[1],
    weight: 2,
    width: 2
  }
];

const mockVariantsWithUndefinedInventory = [
  {
    _id: internalVariantIds[0],
    ancestors: [internalCatalogProductId],
    barcode: "barcode",
    createdAt,
    height: 0,
    index: 0,
    inventoryAvailableToSell: 6,
    inventoryManagement: true,
    inventoryPolicy: false,
    inventoryInStock: 5,
    isDeleted: false,
    isLowQuantity: true,
    isSoldOut: false,
    isVisible: true,
    length: 0,
    lowInventoryWarningThreshold: 0,
    metafields: [
      {
        value: "value",
        namespace: "namespace",
        description: "description",
        valueType: "valueType",
        scope: "scope",
        key: "key"
      }
    ],
    minOrderQuantity: 0,
    optionTitle: "Untitled Option",
    originCountry: "US",
    shopId: internalShopId,
    sku: "sku",
    taxCode: "0000",
    taxDescription: "taxDescription",
    title: "Small Concrete Pizza",
    updatedAt,
    variantId: internalVariantIds[0],
    weight: 0,
    width: 0
  },
  {
    _id: internalVariantIds[1],
    ancestors: [internalCatalogProductId, internalVariantIds[0]],
    barcode: "barcode",
    height: 2,
    index: 0,
    inventoryAvailableToSell: 3,
    inventoryManagement: true,
    inventoryPolicy: true,
    inventoryInStock: 5,
    isDeleted: false,
    isLowQuantity: true,
    isSoldOut: false,
    isVisible: true,
    length: 2,
    lowInventoryWarningThreshold: 0,
    metafields: [
      {
        value: "value",
        namespace: "namespace",
        description: "description",
        valueType: "valueType",
        scope: "scope",
        key: "key"
      }
    ],
    minOrderQuantity: 0,
    optionTitle: "Awesome Soft Bike",
    originCountry: "US",
    shopId: internalShopId,
    sku: "sku",
    taxCode: "0000",
    taxDescription: "taxDescription",
    title: "One pound bag",
    variantId: internalVariantIds[1],
    weight: 2,
    width: 2
  }, {
    _id: internalVariantIds[2],
    ancestors: [internalCatalogProductId, internalVariantIds[0]],
    barcode: "barcode",
    height: 2,
    index: 0,
    inventoryManagement: true,
    inventoryPolicy: true,
    isDeleted: false,
    isLowQuantity: true,
    isSoldOut: false,
    isVisible: true,
    length: 2,
    lowInventoryWarningThreshold: 0,
    metafields: [
      {
        value: "value",
        namespace: "namespace",
        description: "description",
        valueType: "valueType",
        scope: "scope",
        key: "key"
      }
    ],
    minOrderQuantity: 0,
    optionTitle: "Awesome Soft Bike",
    originCountry: "US",
    shopId: internalShopId,
    sku: "sku",
    taxCode: "0000",
    taxDescription: "taxDescription",
    title: "One pound bag",
    variantId: internalVariantIds[1],
    weight: 2,
    width: 2
  }
];

beforeAll(() => {
  rewire$getVariants(mockGetVariants);
});

afterAll(restore$getVariants);

// expect product variant quantity number when passing a single variant
test("expect product variant quantity number", async () => {
  mockGetVariants.mockReturnValueOnce(Promise.resolve(mockVariants));
  const spec = await getProductInventoryAvailableToSellQuantity(mockVariants, mockCollections);
  expect(spec).toEqual(9);
});

// expect 0 if all variants have an inventory quantity of 0
test("expect 0 if all variants have an inventory quantity of 0", async () => {
  mockVariants[0].inventoryAvailableToSell = 0;
  mockVariants[1].inventoryAvailableToSell = 0;
  const spec = await getProductInventoryAvailableToSellQuantity(mockVariants[0], mockCollections, mockVariants);
  expect(spec).toEqual(0);
});

// Expect product variant with quantity even if one has undefined inventory
test("expect product variant quantity number even when some have undefined inventory", async () => {
  mockGetVariants.mockReturnValueOnce(Promise.resolve(mockVariantsWithUndefinedInventory));
  const spec = await getProductInventoryAvailableToSellQuantity(mockVariantsWithUndefinedInventory, mockCollections);
  expect(spec).toEqual(9);
});