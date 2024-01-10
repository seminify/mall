package org.seminify.app.service;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ProductServiceTest {
    @Autowired
    private ProductService productService;

    @Test
    public void testRegister() {
        var productDTO = ProductDTO.builder().pname("새로운 상품").price(1000).pdesc("신규 추가 상품입니다.").build();
        productDTO.setUploadFileNames(
                List.of(UUID.randomUUID() + "_" + "Test1.jpg", UUID.randomUUID() + "_" + "Test2.jpg"));
        productService.register(productDTO);
    }

    @Test
    public void testList() {
        var pageRequestDTO = PageRequestDTO.builder().build();
        var result = productService.getList(pageRequestDTO);
        result.getDtoList().forEach(log::info);
    }

    @Test
    public void testRead() {
        var pno = 12L;
        var productDTO = productService.get(pno);
        log.info(productDTO);
        log.info(productDTO.getUploadFileNames());
    }
}
