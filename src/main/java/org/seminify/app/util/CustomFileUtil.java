package org.seminify.app.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomFileUtil {
    @Value("{org.seminify.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        var tempFolder = new File(uploadPath);
        if (!tempFolder.exists())
            tempFolder.mkdir();
        uploadPath = tempFolder.getAbsolutePath();
        log.info(uploadPath);
    }

    public List<String> saveFiles(List<MultipartFile> files) {
        if (files == null || files.isEmpty())
            return null;
        List<String> uploadNames = new ArrayList<>();
        files.forEach(multipartFile -> {
            var savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
            var savePath = Paths.get(uploadPath, savedName);
            try {
                Files.copy(multipartFile.getInputStream(), savePath);
                var contentType = multipartFile.getContentType();
                if (contentType != null && contentType.startsWith("image")) {
                    var thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
                    Thumbnails.of(savePath.toFile()).size(200, 200).toFile(thumbnailPath.toFile());
                }
                uploadNames.add(savedName);
            } catch (IOException ioException) {
                throw new RuntimeException(ioException.getMessage());
            }
        });
        return uploadNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {
        var resource = new FileSystemResource(uploadPath + File.separator + fileName);
        if (!resource.exists())
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
        var headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public void deleteFiles(List<String> fileNames) {
        if (fileNames == null || fileNames.isEmpty())
            return;
        fileNames.forEach(fileName -> {
            var thumbnailFileName = "s_" + fileName;
            var thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            var filePath = Paths.get(uploadPath, fileName);
            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException ioException) {
                throw new RuntimeException(ioException.getMessage());
            }
        });

    }
}
