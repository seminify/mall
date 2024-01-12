package org.seminify.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class CartItemListDTO {
    private Long cino;
    private int qty;
    private Long pno;
    private String pname;
    private int price;
    private String imageFile;
}
