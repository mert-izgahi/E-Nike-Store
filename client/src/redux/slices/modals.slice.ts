import { createSlice } from "@reduxjs/toolkit";

interface ModalsSliceState {
  TEST_MODEL: boolean;
  CREATE_CATEGORY_MODEL: boolean;
  UPDATE_CATEGORY_MODEL: boolean;
  DELETE_CATEGORY_MODEL: boolean;
  CREATE_COLLECTION_MODEL: boolean;
  UPDATE_COLLECTION_MODEL: boolean;
  DELETE_COLLECTION_MODEL: boolean;
  CREATE_SIZE_MODEL: boolean;
  UPDATE_SIZE_MODEL: boolean;
  DELETE_SIZE_MODEL: boolean;
  CREATE_VARIANT_MODEL: boolean;
  UPDATE_VARIANT_MODEL: boolean;
  DELETE_VARIANT_MODEL: boolean;
}

const initialState: ModalsSliceState = {
  TEST_MODEL: false,
  CREATE_CATEGORY_MODEL: false,
  UPDATE_CATEGORY_MODEL: false,
  DELETE_CATEGORY_MODEL: false,
  CREATE_COLLECTION_MODEL: false,
  UPDATE_COLLECTION_MODEL: false,
  DELETE_COLLECTION_MODEL: false,
  CREATE_SIZE_MODEL: false,
  UPDATE_SIZE_MODEL: false,
  DELETE_SIZE_MODEL: false,
  CREATE_VARIANT_MODEL: false,
  UPDATE_VARIANT_MODEL: false,
  DELETE_VARIANT_MODEL: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setTestModel: (state, action) => {
      state.TEST_MODEL = action.payload;
    },
    setCreateCategoryModel: (state, action) => {
      state.CREATE_CATEGORY_MODEL = action.payload;
    },
    setUpdateCategoryModel: (state, action) => {
      state.UPDATE_CATEGORY_MODEL = action.payload;
    },
    setDeleteCategoryModel: (state, action) => {
      state.DELETE_CATEGORY_MODEL = action.payload;
    },
    setCreateCollectionModel: (state, action) => {
      state.CREATE_COLLECTION_MODEL = action.payload;
    },
    setUpdateCollectionModel: (state, action) => {
      state.UPDATE_COLLECTION_MODEL = action.payload;
    },
    setDeleteCollectionModel: (state, action) => {
      state.DELETE_COLLECTION_MODEL = action.payload;
    },

    setCreateSizeModel: (state, action) => {
      state.CREATE_SIZE_MODEL = action.payload;
    },
    setUpdateSizeModel: (state, action) => {
      state.UPDATE_SIZE_MODEL = action.payload;
    },
    setDeleteSizeModel: (state, action) => {
      state.DELETE_SIZE_MODEL = action.payload;
    },

    setCreateVariantModel: (state, action) => {
      state.CREATE_VARIANT_MODEL = action.payload;
    },
    setUpdateVariantModel: (state, action) => {
      state.UPDATE_VARIANT_MODEL = action.payload;
    },
    setDeleteVariantModel: (state, action) => {
      state.DELETE_VARIANT_MODEL = action.payload;
    },
  },
});
