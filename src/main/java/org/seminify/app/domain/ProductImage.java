package org.seminify.app.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
@ToString
public class ProductImage {
    private String fileName;
    @Setter
    private int ord;
}
