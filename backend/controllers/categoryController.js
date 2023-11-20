const jwt = require('jsonwebtoken');
const { Category } = require('../models/categoryModel');
const { JWT_SECRET } = require('../configs/constants');

const categoryController = {
    createCategory: async (req, res) => {
        try {
            const { name, color } = req.body;
            const userId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const newCategory = new Category({
                name,
                color,
                user: userId,
            });

            await newCategory.save();
            return res.status(201).json({ message: 'Categoría creada exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getCategoriesByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            if (userId !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const categories = await Category.find({ user: userId });
            return res.status(200).json(categories);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { name, color } = req.body;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            if (category.user.toString() !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            await Category.findByIdAndUpdate(
                categoryId,
                {
                    name,
                    color,
                },
                { new: true }
            );

            return res.status(200).json({ message: 'Categoría actualizada exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            if (category.user.toString() !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const deletedCategory = await Category.findByIdAndDelete(categoryId);

            return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
};

module.exports = { categoryController };