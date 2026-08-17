import categoryModel from "../../models/category-model.js";

export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.body.id,
      { categoryName: req.body.categoryName },
      { new: true },
    );
    res.status(200).json({
      message: "amjilttai category  update hiilee",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "category update hiihed aldaa garlaa",
    });
  }
};
