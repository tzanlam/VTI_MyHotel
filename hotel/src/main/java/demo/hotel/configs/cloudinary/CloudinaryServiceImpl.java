package demo.hotel.configs.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String upload(MultipartFile file) throws IOException {
            if(file.isEmpty()){
                throw new IOException("Empty file");
            }
            if(file.getSize() > 1000000){
                throw new IOException("File size is too large");
            }
        System.out.println("uploading file" + file.getOriginalFilename());
        Map result =  cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return result.get("url").toString();
    }
}
