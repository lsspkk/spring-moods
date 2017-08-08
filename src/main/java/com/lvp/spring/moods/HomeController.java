/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.lvp.spring.moods;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Controller
public class HomeController {


	@Value("${openweathermap.api.key}")
	private String apikey;

	@Value("${openweathermap.api.baseurl}")
	private String baseurl;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

	@ResponseBody
	@RequestMapping(value = "/api/v1/weather")
	public String weather() {
		RestTemplate restTemplate = new RestTemplate();
		// #TODO url pitäis saada properties-tiedostoon, ja apikey myös
		// #TODO pitäis saada proxy, joka päivittää kerran 10 minuutissa säätiedot
		PlainWeather weather = restTemplate.getForObject(baseurl+apikey, PlainWeather.class);

		return weather.toString();
		//return "{\"description\": \"sunny\"}";
	}

	@ResponseBody
	@RequestMapping(value = "/api/v1/weather2")
	public String weather2() {
		return getUrlContents(baseurl+apikey);
	}




	private static String getUrlContents(String theUrl)
	{
		StringBuilder content = new StringBuilder();

		// many of these calls can throw exceptions, so i've just
		// wrapped them all in one try/catch statement.
		try
		{
			// create a url object
			URL url = new URL(theUrl);

			// create a urlconnection object
			URLConnection urlConnection = url.openConnection();

			// wrap the urlconnection in a bufferedreader
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

			String line;

			// read from the urlconnection via the bufferedreader
			while ((line = bufferedReader.readLine()) != null)
			{
				content.append(line + "\n");
			}
			bufferedReader.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return content.toString();
	}

}
// end::code[]