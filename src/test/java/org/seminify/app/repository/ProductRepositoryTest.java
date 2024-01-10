package org.seminify.app.repository;

import java.util.Arrays;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.seminify.app.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testInsert() {
        for (var i = 0; i < 10; i++) {
            var product = Product.builder().pname("상품" + i).price(100 * i).pdesc("상품설명 " + i).build();
            product.addImageString("IMAGE1.jpg");
            product.addImageString("IMAGE2.jpg");
            productRepository.save(product);
        }
    }

    @Test
    public void testList() {
        var pageable = PageRequest.of(0, 10, Sort.by("pno").descending());
        var result = productRepository.selectList(pageable);
        result.forEach(arr -> log.info(Arrays.toString(arr)));
    }

    @Test
    @Transactional
    public void testRead() {
        var pno = 1L;
        var result = productRepository.findById(pno);
        var product = result.orElseThrow();
        log.info(product);
        log.info(product.getImageList());
    }

    @Test
    public void testRead2() {
        var pno = 1L;
        var result = productRepository.selectOne(pno);
        var product = result.orElseThrow();
        log.info(product);
        log.info(product.getImageList());
    }

    @Test
    public void testUpdate() {
        var pno = 10L;
        var product = productRepository.selectOne(pno).orElseThrow();
        product.setPname("10번 상품");
        product.setPdesc("10번 상품 설명입니다.");
        product.setPrice(5000);
        product.clearList();
        product.addImageString(UUID.randomUUID().toString() + "_" + "NEWIMAGE1.jpg");
        product.addImageString(UUID.randomUUID().toString() + "_" + "NEWIMAGE2.jpg");
        product.addImageString(UUID.randomUUID().toString() + "_" + "NEWIMAGE3.jpg");
        productRepository.save(product);
    }

    @Test
    @Commit
    @Transactional
    public void testDelete() {
        var pno = 2L;
        productRepository.updateToDelete(pno, true);
    }
}
