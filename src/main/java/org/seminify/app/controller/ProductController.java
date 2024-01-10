package org.seminify.app.controller;

import java.util.Map;

import org.seminify.app.dto.ProductDTO;
import org.seminify.app.util.CustomFileUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequestMapping("api/products")
@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductController {
    private final CustomFileUtil customFileUtil;

    @PostMapping
    public Map<String, String> register(ProductDTO productDTO) {
        log.info("ProductDTO : " + productDTO);
        var files = productDTO.getFiles();
        var uploadFileNames = customFileUtil.saveFiles(files);
        productDTO.setUploadFileNames(uploadFileNames);
        log.info(uploadFileNames);
        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable(name = "fileName") String fileName) {
        return customFileUtil.getFile(fileName);
    }
}
