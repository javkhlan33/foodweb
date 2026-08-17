import categoryModel from "../../models/category-model.js";

export const deletedCategory = async (req, res) => {
  const oldCategory = await categoryModel.findByIdAndDelete(req.body.id);
  res.status(200).json({
    message: "amjilttai category  delete hiilee",
    category: oldCategory,
  });
};
