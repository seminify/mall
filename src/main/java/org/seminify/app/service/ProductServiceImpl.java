package org.seminify.app.service;

import java.util.List;

import org.seminify.app.domain.Product;
import org.seminify.app.domain.ProductImage;
import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.PageResponseDTO;
import org.seminify.app.dto.ProductDTO;
import org.seminify.app.repository.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    private Product dtoToEntity(ProductDTO productDTO) {
        var product = Product.builder().pno(productDTO.getPno()).pname(productDTO.getPname())
                .price(productDTO.getPrice()).pdesc(productDTO.getPdesc()).build();
        var uploadFileNames = productDTO.getUploadFileNames();
        if (uploadFileNames == null)
            return product;
        uploadFileNames.forEach(product::addImageString);
        return product;
    }

    private ProductDTO entityToDTO(Product product) {
        var productDTO = ProductDTO.builder().pno(product.getPno()).pname(product.getPname()).price(product.getPrice())
                .pdesc(product.getPdesc()).build();
        var imageList = product.getImageList();
        if (imageList == null || imageList.isEmpty())
            return productDTO;
        var fileNameList = imageList.stream().map(ProductImage::getFileName).toList();
        productDTO.setUploadFileNames(fileNameList);
        return productDTO;
    }

    @Override
    public Long register(ProductDTO productDTO) {
        var product = dtoToEntity(productDTO);
        var result = productRepository.save(product);
        return result.getPno();
    }

    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
        var pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
                Sort.by("pno").descending());
        var result = productRepository.selectList(pageable);
        var dtoList = result.map(arr -> {
            var product = (Product) arr[0];
            var productImage = (ProductImage) arr[1];
            var productDTO = ProductDTO.builder().pno(product.getPno()).pname(product.getPname())
                    .price(product.getPrice()).pdesc(product.getPdesc()).build();
            var imageStr = productImage.getFileName();
            productDTO.setUploadFileNames(List.of(imageStr));
            return productDTO;
        }).toList();
        var totalCount = result.getTotalElements();
        return PageResponseDTO.<ProductDTO>withAll().dtoList(dtoList).pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount).build();
    }

    @Override
    public ProductDTO get(Long pno) {
        var result = productRepository.selectOne(pno);
        var product = result.orElseThrow();
        var productDTO = entityToDTO(product);
        return productDTO;
    }

    @Override
    public void modify(ProductDTO productDTO) {
        var result = productRepository.findById(productDTO.getPno());
        var product = result.orElseThrow();
        product.setPname(productDTO.getPname());
        product.setPrice(productDTO.getPrice());
        product.setPdesc(productDTO.getPdesc());
        product.clearList();
        var uploadFileNames = productDTO.getUploadFileNames();
        if (uploadFileNames != null && !uploadFileNames.isEmpty())
            uploadFileNames.forEach(product::addImageString);
        productRepository.save(product);
    }

    @Override
    public void remove(Long pno) {
        productRepository.updateToDelete(pno, true);
    }
}
