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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

/**
 * @author Greg Turnquist
 */

// tag::code[]
public class WeatherTestApp {


	private static final Logger log = LoggerFactory.getLogger(WeatherTestApp.class);




	public static void main(String args[]) {

		RestTemplate restTemplate = new RestTemplate();
		PlainWeather weather = restTemplate.getForObject("http://api.openweathermap.org/data/2.5/weather?units=metric&q=Tampere,fi&APPID=0ecfd37d95a0fedd99437d34640aa0c6", PlainWeather.class);


		log.info(weather.toString());

	}

}
// end::code[]