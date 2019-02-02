package com.github.wz2cool.demo.pakojs.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.util.zip.GZIPInputStream;

@RestController
@RequestMapping("/pakojs")
public class PakojsController {

    @GetMapping("/")
    public String sayHello() {
        return "hello world";
    }

    @PostMapping("/decompress")
    public String decompress(HttpServletRequest request) throws Exception {
        String encoding = request.getHeader("Content-Encoding");

        if (StringUtils.equalsIgnoreCase("gzip", encoding)) {
            GZIPInputStream gis = new GZIPInputStream(request.getInputStream());
            BufferedReader br = new BufferedReader(new InputStreamReader(gis, "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            br.close();
            gis.close();

            String result = URLDecoder.decode(sb.toString(), "UTF-8");

            System.out.println(result);

            return sb.toString();
        } else {
            return "not a gzip";
        }


    }
}
