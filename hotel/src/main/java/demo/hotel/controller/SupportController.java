package demo.hotel.controller;

import demo.hotel.configs.cloudinary.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class SupportController {
    private final CloudinaryService cloudinaryService;

    @PostMapping(value = "/postImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postImage(@RequestBody MultipartFile file) {
        try{
            return ResponseEntity.ok(cloudinaryService.upload(file));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
