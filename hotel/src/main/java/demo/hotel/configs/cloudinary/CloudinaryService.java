package demo.hotel.configs.cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface CloudinaryService {
    String upload(MultipartFile file) throws IOException;
}
