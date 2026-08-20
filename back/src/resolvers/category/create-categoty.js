import categoryModel from "../../models/category-model.js";

export const CreateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || !categoryName.trim()) {
      return res.status(400).json({
        message: "Category нэр оруулна уу",
      });
    }

    const newCategory = await categoryModel.create({
      categoryName: categoryName.trim(),
    });

    res.status(201).json({
      message: "Амжилттай category үүслээ",
      category: newCategory,
    });
  } catch (error) {
    console.error("Create category error:", error);

    res.status(500).json({
      message: "Category үүсгэхэд алдаа гарлаа",
      error: error.message,
    });
  }
};
