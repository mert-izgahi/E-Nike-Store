import { modalsSlice } from "@/redux/slices/modals.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export const useModals = () => {
  const {
    CREATE_CATEGORY_MODEL,
    UPDATE_CATEGORY_MODEL,
    DELETE_CATEGORY_MODEL,
    CREATE_COLLECTION_MODEL,
    UPDATE_COLLECTION_MODEL,
    DELETE_COLLECTION_MODEL,
    CREATE_SIZE_MODEL,
    UPDATE_SIZE_MODEL,
    DELETE_SIZE_MODEL,
    CREATE_VARIANT_MODEL,
    UPDATE_VARIANT_MODEL,
    DELETE_VARIANT_MODEL,
  } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  return {
    CREATE_CATEGORY_MODEL,
    UPDATE_CATEGORY_MODEL,
    DELETE_CATEGORY_MODEL,
    CREATE_COLLECTION_MODEL,
    UPDATE_COLLECTION_MODEL,
    DELETE_COLLECTION_MODEL,
    CREATE_SIZE_MODEL,
    UPDATE_SIZE_MODEL,
    DELETE_SIZE_MODEL,
    CREATE_VARIANT_MODEL,
    UPDATE_VARIANT_MODEL,
    DELETE_VARIANT_MODEL,
    // Category
    openCreateCategoryModal: () =>
      dispatch(modalsSlice.actions.setCreateCategoryModel(true)),
    closeCreateCategoryModal: () =>
      dispatch(modalsSlice.actions.setCreateCategoryModel(false)),
    openUpdateCategoryModal: () =>
      dispatch(modalsSlice.actions.setUpdateCategoryModel(true)),
    closeUpdateCategoryModal: () =>
      dispatch(modalsSlice.actions.setUpdateCategoryModel(false)),
    openDeleteCategoryModal: () =>
      dispatch(modalsSlice.actions.setDeleteCategoryModel(true)),
    closeDeleteCategoryModal: () =>
      dispatch(modalsSlice.actions.setDeleteCategoryModel(false)),
    // Collection
    openCreateCollectionModal: () =>
      dispatch(modalsSlice.actions.setCreateCollectionModel(true)),
    closeCreateCollectionModal: () =>
      dispatch(modalsSlice.actions.setCreateCollectionModel(false)),
    openUpdateCollectionModal: () =>
      dispatch(modalsSlice.actions.setUpdateCollectionModel(true)),
    closeUpdateCollectionModal: () =>
      dispatch(modalsSlice.actions.setUpdateCollectionModel(false)),
    openDeleteCollectionModal: () =>
      dispatch(modalsSlice.actions.setDeleteCollectionModel(true)),
    closeDeleteCollectionModal: () =>
      dispatch(modalsSlice.actions.setDeleteCollectionModel(false)),
    // Variant
    openCreateVariantModal: () =>
      dispatch(modalsSlice.actions.setCreateVariantModel(true)),
    closeCreateVariantModal: () =>
      dispatch(modalsSlice.actions.setCreateVariantModel(false)),
    openUpdateVariantModal: () =>
      dispatch(modalsSlice.actions.setUpdateVariantModel(true)),
    closeUpdateVariantModal: () =>
      dispatch(modalsSlice.actions.setUpdateVariantModel(false)),
    openDeleteVariantModal: () =>
      dispatch(modalsSlice.actions.setDeleteVariantModel(true)),
    closeDeleteVariantModal: () =>
      dispatch(modalsSlice.actions.setDeleteVariantModel(false)),
  };
};
