package org.seminify.app.service;

import java.util.List;

import org.seminify.app.dto.CartItemDTO;
import org.seminify.app.dto.CartItemListDTO;

public interface CartService {
    List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    List<CartItemListDTO> getCartItems(String email);

    List<CartItemListDTO> remove(Long cino);
}
