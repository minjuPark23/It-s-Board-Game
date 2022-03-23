package com.ssafy.IBG.api.Deal;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class DealUtil {
    /**
     * 폴더 생성
     * @param filePath
     */
    public void makeDir(String filePath) {
        if (!new File(filePath).exists()) {
            try {
                new File(filePath).mkdir();
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }

    /**
     *  프론트 단에서 파일을 받아 확장자에 따라 파일 타입을 결정
     * */
    public String getFileType(MultipartFile files){
        String fileName = files.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        extension = extension.toLowerCase();
        if(extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png"))
            return "IMAGE";

        return null;
    }
}
