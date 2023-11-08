package com.txt.examportal.service.impl;

import com.txt.examportal.dto.request.dto.CategoryDto;
import com.txt.examportal.exception.ExamPortalException;
import com.txt.examportal.model.exam.Category;
import com.txt.examportal.repository.CategoryRepository;
import com.txt.examportal.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category categoryInfo) {
        try {
            Category userlocal = categoryRepository.findByTitle(categoryInfo.getTitle());

            if (userlocal != null) {
                log.warn("Category already exists in the database");
                throw new RuntimeException("Category already exists in the database");
            }

            Category category = categoryRepository.save(categoryInfo);

            return category;
        } catch (Exception e) {
            throw new ExamPortalException(e.getMessage());
        }
    }

    @Override
    public Category updateCategory(CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryDto.getCId()).get();

        if(category == null || category.getCId() == null){
            log.warn("Category not exist in database");
            throw new RuntimeException("Category not exist in database");
        }

        BeanUtils.copyProperties(categoryDto, category);
        Category categoryUpd = categoryRepository.save(category);
        return categoryUpd;
    }

    @Override
    public List<Category> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).get();
        return category;
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
