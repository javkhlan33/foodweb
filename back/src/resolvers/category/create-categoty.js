import categoryModel from "../../models/category-model.js";

export const CreateCategory = async (req, res) => {
  const newCategory = await categoryModel.create({
    categoryName: req.body.categoryName,
  });
  res.status(200).json({
    message: "amjilttai category uuslee",
    category: newCategory,
  });
};
