package org.seminify.app.controller;

import java.util.Map;

import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.PageResponseDTO;
import org.seminify.app.dto.ProductDTO;
import org.seminify.app.service.ProductService;
import org.seminify.app.util.CustomFileUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequestMapping("api/products")
@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductController {
    private final ProductService productService;
    private final CustomFileUtil customFileUtil;

    @PostMapping
    public Map<String, Long> register(ProductDTO productDTO) {
        log.info("ProductDTO : " + productDTO);
        var files = productDTO.getFiles();
        var uploadFileNames = customFileUtil.saveFiles(files);
        productDTO.setUploadFileNames(uploadFileNames);
        log.info(uploadFileNames);
        var pno = productService.register(productDTO);
        return Map.of("RESULT", pno);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    @GetMapping("list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("PageRequestDTO : " + pageRequestDTO);
        return productService.getList(pageRequestDTO);
    }

    @GetMapping("{pno}")
    public ProductDTO read(@PathVariable(name = "pno") Long pno) {
        return productService.get(pno);
    }

    @GetMapping("view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable(name = "fileName") String fileName) {
        return customFileUtil.getFile(fileName);
    }

    @PutMapping("{pno}")
    public Map<String, String> modify(@PathVariable(name = "pno") Long pno, ProductDTO productDTO) {
        productDTO.setPno(pno);
        var oldProductDTO = productService.get(pno);
        var oldFileNames = oldProductDTO.getUploadFileNames();
        var files = productDTO.getFiles();
        var currentUploadFileNames = customFileUtil.saveFiles(files);
        var uploadedFileNames = productDTO.getUploadFileNames();
        if (currentUploadFileNames != null && !currentUploadFileNames.isEmpty())
            uploadedFileNames.addAll(currentUploadFileNames);
        productService.modify(productDTO);
        if (oldFileNames != null && !oldFileNames.isEmpty()) {
            var removeFiles = oldFileNames.stream().filter(fileName -> !uploadedFileNames.contains(fileName)).toList();
            customFileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("{pno}")
    public Map<String, String> remove(@PathVariable(name = "pno") Long pno) {
        var oldFileNames = productService.get(pno).getUploadFileNames();
        productService.remove(pno);
        customFileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT", "SUCCESS");
    }
}
