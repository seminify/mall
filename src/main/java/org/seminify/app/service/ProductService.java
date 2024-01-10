package org.seminify.app.service;

import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.PageResponseDTO;
import org.seminify.app.dto.ProductDTO;

public interface ProductService {
    Long register(ProductDTO productDTO);

    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    ProductDTO get(Long pno);

    void modify(ProductDTO productDTO);

    void remove(Long pno);
}
