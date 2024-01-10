package org.seminify.app.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_product")
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
@ToString(exclude = "imageList")
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long pno;
    @Setter
    private String pname;
    @Setter
    private int price;
    @Setter
    private String pdesc;
    @Setter
    private boolean delFlag;
    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    public void addImage(ProductImage productImage) {
        productImage.setOrd(this.imageList.size());
        this.imageList.add(productImage);
    }

    public void addImageString(String fileName) {
        var productImage = ProductImage.builder().fileName(fileName).build();
        addImage(productImage);
    }

    public void clearList() {
        this.imageList.clear();
    }
}
