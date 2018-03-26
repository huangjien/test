package atest.data.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    final String uiForward = "redirect:/ui/index.html";
    final String[] fauxRoots = new String[] {"/", "/index.html", "/ui", "/ui/"};

    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        for(String path: fauxRoots) {
            registry.addViewController(path).setViewName(uiForward);
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/META-INF/resources/", "classpath:/resources/",
                        "classpath:/static/", "classpath:/public/")
                .setCachePeriod(31556926);
    }
}
