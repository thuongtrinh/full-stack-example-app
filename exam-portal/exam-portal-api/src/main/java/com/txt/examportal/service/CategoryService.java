package com.txt.examportal.service;

import com.txt.examportal.dto.request.dto.CategoryDto;
import com.txt.examportal.model.exam.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);

    Category updateCategory(CategoryDto categoryDto);

    List<Category> getCategories();

    Category getCategoryById(Long categoryId);

    void deleteCategory(Long categoryId);
}
