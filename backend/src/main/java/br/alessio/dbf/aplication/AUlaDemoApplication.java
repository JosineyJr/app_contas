package br.alessio.dbf.aplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EntityScan(basePackages={"br.alessio.dbf.model"})
@EnableJpaRepositories(basePackages={"br.alessio.dbf.repository"})
@ComponentScan(basePackages = {"br.alessio.dbf"})
@SpringBootApplication
public class AUlaDemoApplication {

	private static ApplicationContext applicationContext;

	public static void main(String[] args) {

		SpringApplication.run(AUlaDemoApplication.class, args);

//		applicationContext =
//				new AnnotationConfigApplicationContext(AUlaDemoApplication.class);
//
//		for (String beanName : applicationContext.getBeanDefinitionNames()) {
			System.out.println("Teste");
//		}
	}

}
