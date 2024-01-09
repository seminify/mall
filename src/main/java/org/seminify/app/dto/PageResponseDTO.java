package org.seminify.app.dto;

import java.util.List;
import java.util.stream.IntStream;

import lombok.Builder;
import lombok.Data;

@Data
public class PageResponseDTO<E> {
    private List<E> dtoList;
    private List<Integer> pageNumList;
    private PageRequestDTO pageRequestDTO;
    private boolean prev;
    private boolean next;
    private int totalCount;
    private int prevPage;
    private int nextPage;
    private int totalPage;
    private int current;

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) totalCount;
        var end = (int) (Math.ceil(pageRequestDTO.getPage() / (double) pageRequestDTO.getSize()))
                * pageRequestDTO.getSize();
        var start = end - pageRequestDTO.getSize() + 1;
        var last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));
        end = Math.min(end, last);
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().toList();
        this.prev = start > 1;
        this.next = totalCount > (long) end * pageRequestDTO.getSize();
        if (prev)
            this.prevPage = start - 1;
        if (next)
            this.nextPage = end + 1;
        this.totalPage = this.pageNumList.size();
        this.current = pageRequestDTO.getPage();
    }
}
