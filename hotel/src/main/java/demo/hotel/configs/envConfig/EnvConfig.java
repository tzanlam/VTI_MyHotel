package demo.hotel.configs.envConfig;

import io.github.cdimascio.dotenv.DotEnvException;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class EnvConfig {

    private static final Dotenv dotenv;

    static {
        Dotenv tempDotenv = null;
        try {
            tempDotenv = Dotenv.load();
            tempDotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        dotenv = tempDotenv;
    }

    @Bean
    public Dotenv getDotenv() {
        if (dotenv == null) {
            throw new IllegalStateException("Dotenv not initialized");
        }
        return dotenv;
    }
}
